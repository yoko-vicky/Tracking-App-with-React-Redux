import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AdminItemForm = ({
  title, unit, icon, target, handleSubmit,
}) => {
  const [error, setError] = useState('');
  const [inputTitle, setInputTitle] = useState(title || '');
  const [inputUnit, setInputUnit] = useState(unit || '');
  const [inputIcon, setInputIcon] = useState(icon || '');
  const [inputTarget, setInputTarget] = useState(target || '');

  const onTitleChange = (e) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9-':,()]{0,23}$/;
    if (value.match(regex)) {
      setError('');
      setInputTitle(value);
    } else {
      setError("Alphabet, numbers, ', ;, :, (, and ) are available. The number of letters should be within 23");
    }
  };

  const onUnitChange = (e) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z]{0,9}$/;
    if (value.match(regex)) {
      setError('');
      setInputUnit(value);
    } else {
      setError('Alphabet is available and the number of letters should be between 1 and 9');
    }
  };
  const onIconChange = (e) => {
    const { value } = e.target;
    setInputIcon(value);
  };
  const onTargetChange = (e) => {
    const { value } = e.target;
    const regex = /^[0-9]{0,3}$/;
    if (value.match(regex)) {
      setError('');
      setInputTarget(value);
    } else {
      setError('Please provide a number within 3 digit');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const iconRegex = /^[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/;
    if (!inputTitle || !inputUnit || !inputTarget) {
      setError('Please provide valid title, unit, and target');
    } else if (!!inputIcon && !inputIcon.match(iconRegex)) {
      setError('Please provide a valid icon string or leave it empty');
      setInputIcon('');
    } else {
      const item = {
        title: inputTitle,
        unit: inputUnit,
        icon: inputIcon,
        target: inputTarget,
      };
      handleSubmit(item);
    }
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
            onChange={onTitleChange}
          />
        </div>
        <div className="form__group">
          <div className="form__title">Unit (Singular)</div>
          <input
            type="text"
            name="unit"
            placeholder="Item Unit"
            value={inputUnit}
            onChange={onUnitChange}
          />
        </div>
        <div className="form__group">
          <div className="form__title">Target</div>
          <input
            type="text"
            name="unit"
            placeholder="Item Target"
            value={inputTarget}
            onChange={onTargetChange}
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
            onChange={onIconChange}
          />
        </div>
        {error && <p className="error-msg mb3">{error}</p>}
        <button type="submit" className="btn dark w100 mb2">Save Item</button>
      </form>
    </div>
  );
};

AdminItemForm.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  icon: PropTypes.string,
  target: PropTypes.number,
  handleSubmit: PropTypes.func,
};

AdminItemForm.defaultProps = {
  title: '',
  unit: '',
  icon: '',
  target: 0,
  handleSubmit: null,
};

export default AdminItemForm;
