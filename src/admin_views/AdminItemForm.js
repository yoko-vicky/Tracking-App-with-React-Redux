import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

const AdminItemForm = ({
  title, unit, icon, handleSubmit,
}) => {
  const [inputTitle, setInputTitle] = useState(title || '');
  const [inputUnit, setInputUnit] = useState(unit || '');
  const [inputIcon, setInputIcon] = useState(icon || '');

  const onSubmit = (e) => {
    e.preventDefault();
    const item = {
      title: inputTitle,
      unit: inputUnit,
      icon: inputIcon,
    };
    handleSubmit(item);
  };

  return (
    <div>
      <h1>AdminItemForm</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Item Label"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="unit"
            placeholder="Item Unit"
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="icon"
            placeholder="Item icon"
            value={inputIcon}
            onChange={(e) => setInputIcon(e.target.value)}
          />
        </div>
        <button type="submit">Save Item</button>
      </form>
    </div>
  );
};

AdminItemForm.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  icon: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

AdminItemForm.defaultProps = {
  title: '',
  unit: '',
  icon: '',
};

export default AdminItemForm;
