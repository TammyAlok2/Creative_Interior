"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useRef } from "react";
import axiosInstance from "./axiosInstance";
import { useAuthStore } from "./authStore";

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      addItem: async (product, quantity) => {
        if (!quantity) quantity = 1;
        const { user } = useAuthStore.getState();

        set((state) => {
          // Check if item already exists
          const existingItemIndex = state.items.findIndex(
            (item) => item.product._id === product._id
          );

          if (existingItemIndex > -1) {
            // Update quantity if item exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;

            // Sync with backend if user is logged in
            if (user) {
              axiosInstance
                .post(
                  "user/addCartProduct",
                  {
                    productId: product._id,
                    quantity: updatedItems[existingItemIndex].quantity,
                  },
                  { withCredentials: true }
                )
                .catch((error) => {
                  console.error("Failed to update cart item:", error);
                });
            }

            return { items: updatedItems };
          }

          // Add new item
          const newCartItem = {
            product,
            quantity,
          };
          const updatedItems = [...state.items, newCartItem];

          // Sync with backend if user is logged in
          if (user) {
            axiosInstance
              .post(
                "user/addCartProduct",
                {
                  productId: product._id,
                  quantity: quantity,
                },
                { withCredentials: true }
              )
              .catch((error) => {
                console.error("Failed to add cart item:", error);
              });
          }

          return { items: updatedItems };
        });
      },

      allCartItems: async () => {
        try {
          const response = await axiosInstance.get("user/allCartProduct", {
            withCredentials: true,
          });
          // console.log(response.data.data.cart.items)
          set({ items: response.data.data.cart.items });
        } catch (error) {
          console.error("Failed to initialize cart:", error);
        }
      },

      // Remove item from cart
      removeItem: async (productId) => {
        const { user } = useAuthStore.getState();

        // Perform local removal first
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.product._id !== productId
          );

          

          // Sync with backend if user is logged in
          if (user) {
            axiosInstance
              .delete(`user/deleteCartProduct/${productId}`, {
                withCredentials: true,
              })
              .catch((error) => {
                console.error("Failed to remove cart item:", error);
                // Optionally, you might want to add the item back to the local state
                // if the backend deletion fails
              });
          }

          return { items: updatedItems };
        });
      },

      // Update quantity of a specific item
      updateItemQuantity: (productId, quantity) => {
        const { user } = useAuthStore.getState();

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          );

          return { items: updatedItems };
        });
      },

      // Clear entire cart
      clearCart: () => {
        const { user } = useAuthStore.getState();

        set({ items: [] });

        // Clear cart on backend if user is logged in
        if (user) {
          try {
            const response = axiosInstance.delete("user/clearCart", {
              withCredentials: true,
            });
            console.log(response);
          } catch (error) {
            console.error("Failed to clear cart:", error);
          }
        }
      },

      // Sync cart with backend
      syncCartWithBackend: async () => {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return;

          const cartItems = get().items;

          // Prevent unnecessary requests if cart is empty
          if (cartItems.length === 0) return;

          // Sync each item
          for (const item of cartItems) {
            try {
              await axiosInstance.post(
                "user/addCartProduct",
                {
                  productId: item.product._id,
                  quantity: item.quantity,
                },
                {
                  withCredentials: true,
                }
              );

              console.log(`Successfully synced product: ${item.product._id}`);
            } catch (itemSyncError) {
              console.error(
                `Failed to sync product ${item.product._id}:`,
                itemSyncError
              );
            }
          }

          console.log("Cart synchronization completed");
        } catch (overallError) {
          console.error("Overall cart synchronization failed", overallError);
        }
      },

      // Initialize cart from backend
      initializeCart: async () => {
        try {
          const { user } = useAuthStore.getState();
          if (!user) return;

          const localCartItems = get().items;

          // First, sync local cart items to backend
          if (localCartItems.length > 0) {
            for (const item of localCartItems) {
              try {
                await axiosInstance.post(
                  "user/addCartProduct",
                  {
                    productId: item.product._id,
                    quantity: item.quantity,
                  },
                  { withCredentials: true }
                );
              } catch (syncError) {
                console.error(
                  `Failed to sync local item ${item.product._id}:`,
                  syncError
                );
              }
            }
          }

          // Then fetch backend cart items
          const response = await axiosInstance.get("user/allCartProduct", {
            withCredentials: true,
          });

          // Set cart items from backend
          const backendCartItems = response.data.data.cart.items || [];
          set({ items: backendCartItems });
        } catch (error) {
          console.error("Failed to initialize cart:", error);
        }
      },

      // [Rest of the methods remain the same]
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

// Hook for cart synchronization
export function useCartSync() {
  const { user } = useAuthStore();
  const { initializeCart } = useCartStore();

  // Ref to track whether initialization has occurred
  const isInitialized = useRef(false);

  useEffect(() => {
    // Reset initialization when user changes
    isInitialized.current = false;
  }, [user]);

  useEffect(() => {
    // Sync cart only when user logs in and not previously initialized
    const performOneTimeSync = async () => {
      if (user && !isInitialized.current) {
        try {
          // Perform initialization
          await initializeCart();

          // Mark as initialized to prevent future syncs
          isInitialized.current = true;
        } catch (error) {
          console.error("Cart initialization failed", error);
        }
      }
    };

    performOneTimeSync();
  }, [user, initializeCart]);
}
