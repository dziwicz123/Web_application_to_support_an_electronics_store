import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Typography,
} from '@mui/material';

function ProductFilter({ onFilterChange, producers = [], categoryId }) {
  const [filters, setFilters] = useState({
    producers: {},
    priceFrom: '',
    priceTo: '',
  });

  const previousFiltersRef = useRef(filters);
  const debouncedOnFilterChange = useCallback(debounce(onFilterChange, 300), [onFilterChange]);

  // Kiedy "producers" się zmieni (np. z bazy), odbudujmy stan "producers" w filters
  useEffect(() => {
    const producersObj = producers.reduce((acc, producer) => {
      if (producer) acc[producer] = false;
      return acc;
    }, {});

    // Nadpisujemy stary stan, ale zostawiamy priceFrom i priceTo
    setFilters(prev => ({
      ...prev,
      producers: producersObj,
    }));
  }, [producers]);

  // Kolejny useEffect śledzi zmiany "filters" i wywołuje debouncedOnFilterChange
  useEffect(() => {
    const selectedProducers = Object.keys(filters.producers).filter(
        (producer) => filters.producers[producer] === true
    );

    const updatedFilters = {
      ...filters,
      producers: selectedProducers,
    };

    if (JSON.stringify(updatedFilters) !== JSON.stringify(previousFiltersRef.current)) {
      debouncedOnFilterChange(updatedFilters);
      previousFiltersRef.current = updatedFilters;
    }
  }, [filters, debouncedOnFilterChange]);

  // Obsługa checkboxów
  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [name]: checked,
      },
    }));
  };

  // Obsługa inputów (priceFrom, priceTo)
  const handleInputChange = ({ target: { name, value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
      <Box sx={{ padding: 2, width: 300, backgroundColor: '#f8f4ee', borderRadius: 7 }}>
        <Typography variant="h6">Filtry</Typography>

        <Box mt={2}>
          <Typography variant="subtitle1">Cena</Typography>
          <Box display="flex" justifyContent="space-between">
            <Input
                placeholder="od"
                type="number"
                name="priceFrom"
                value={filters.priceFrom}
                onChange={handleInputChange}
            />
            <Input
                placeholder="do"
                type="number"
                name="priceTo"
                value={filters.priceTo}
                onChange={handleInputChange}
            />
          </Box>
        </Box>

        {/* Jeśli categoryId === "1" (lub cokolwiek innego), wyświetl listę producentów */}
        <Box mt={2}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Producent</FormLabel>
            <FormGroup>
              {Object.keys(filters.producers).map((producer) => (
                  <FormControlLabel
                      key={producer}
                      control={
                        <Checkbox
                            name={producer}
                            checked={filters.producers[producer]}
                            onChange={(e) => handleCheckboxChange(e, 'producers')}
                        />
                      }
                      label={producer}
                  />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
  );
}

// Funkcja debounce
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default ProductFilter;
