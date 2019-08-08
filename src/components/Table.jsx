import React from 'react';
import Proptypes from 'prop-types';

const Table = ({ submittedValues }) => (
  <div className='table' data-testid='table'>
    {Object.keys(submittedValues).map((key, index) => (
      <p key={index} data-testid={key + index}>
        <span>{key} :</span>
        <span>{submittedValues[key].toString()}</span>
      </p>
    ))}
  </div>
);

Table.propTypes = {
  submittedValues: Proptypes.object.isRequired,
};

export default Table;
