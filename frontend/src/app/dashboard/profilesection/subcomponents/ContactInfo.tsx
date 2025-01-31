const ContactInfo = ({ css, user, formData, handleInputChange, isEditing, errors }) => {
  return (
      <div className="mt-[1rem] border-b flex flex-col gap-[1rem] w-[80%] max-[562px]:w-[100%]">
          <div className="mb-4">
              <label className={css.label}>Email Address</label>
              <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className={css.input}
                  readOnly={true}
              />
          </div>

          <div className="mb-4">
              <label className={css.label}>Phone Number</label>
              <input
                  type="Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={css.input}
                  readOnly={!isEditing}
              />
              {errors.phoneNumber && <p className={css.error}>{errors.phoneNumber}</p>}
          </div>
      </div>
  );
};

export default ContactInfo;