import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Select } from '@bubbles-ui/components';
import { listProgramsRequest } from '../../request';

export default function SelectProgram({ center, value: userValue, onChange, ...props }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(userValue);

  const handleChange = (newValue) => {
    if (newValue !== value) {
      // EN: Do not update value if it is a controlled input
      // ES: No actualizar el valor si es un input controlado
      if (userValue === undefined) {
        setValue(newValue);
      }

      // EN: Notify the parent component about the change
      // ES: Notificar al componente padre sobre el cambio
      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    }
  };

  // EN: Update the value when controlled value changes
  // ES: Actualizar el valor cuando el valor controlado cambia
  useEffect(() => {
    if (data.length && userValue) {
      setValue(userValue);
    }
  }, [userValue]);

  // EN: Get programs from API on center change
  // ES: Obtener programas desde API en cambio de centro
  useEffect(async () => {
    if (center) {
      const {
        data: { items },
      } = await listProgramsRequest({ page: 0, size: 9999, center });

      setData(items.map(({ id, name }) => ({ value: id, label: name })));
    }
  }, [center]);

  return (
    <Select {...props} data={data} disabled={!data.length} onChange={handleChange} value={value} />
  );
}

SelectProgram.propTypes = {
  center: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};