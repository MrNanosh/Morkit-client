import React from 'react';
export default function handleError(
  hasError,
  error
) {
  if (hasError) {
    return (
      <div className="error">
        {error.message}
      </div>
    );
  } else {
    return null;
  }
}
