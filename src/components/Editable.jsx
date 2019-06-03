import React from 'react';
const Editable = ({text}) => (
    <div>
      {text[0]}
      <input name="field" type="text" value={field} onChange={onFieldChange}/>
      {text[1]}
      <input name="value" type="text" value={value} onChange={onValueChange}/>
      </div>
  )

export default Editable;