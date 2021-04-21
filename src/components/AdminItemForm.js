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
      <form className="form" onSubmit={onSubmit}>
        <div className="form__group">
          <div className="form__title">Item Label</div>
          <input
            type="text"
            name="title"
            placeholder="Item Label"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>
        <div className="form__group">
          <div className="form__title">Unit (Singular)</div>
          <input
            type="text"
            name="unit"
            placeholder="Item Unit"
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
          />
        </div>
        <div className="form__group">
          <div className="form__title">Icon</div>
          <p className="form__desc">
            Please add the string for data-icon of the icon that you can find in
            <span className="strong"><a href="https://iconify.design/icon-sets/" target="_blank" rel="noreferrer">Iconify</a></span>
            . For exapmle, if you want to use
            <span className="iconify" data-icon="bi:pen-fill" data-inline="false" />
            , you need to to add
            <span className="blue strong">&apos;bi:pen-fill&apos;</span>
            that is the data-icon attribute value of this icon. If you leave this field empty,
            <span className="iconify" data-icon="heroicons-outline:paper-clip" data-inline="false" />
            is provided automatically.
          </p>
          <input
            type="text"
            name="icon"
            placeholder="Item icon"
            value={inputIcon}
            onChange={(e) => setInputIcon(e.target.value)}
          />
        </div>
        <button type="submit" className="btn dark w100 mb2">Save Item</button>
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
