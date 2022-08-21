import React, { useState } from "react";
import "./App.css";

const App = () => {
  // The selected menu
  const [selectedMenu, setSelectedMenu] = useState<number>();

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMenu(Number(event.target.value));
  };

  const getMenu = () => {
    return  {
      menus: [
        // first group of radio-buttons
        [
          { id: '101', value: 'Vegetarian' },
          { id: '102', value: 'Nut allergy' },
          { id: '103', value: 'Halal' }
        ],
        // second group of radio-buttons
        [
          { id: '201', value: 'Cashew chicken' },
          { id: '202', value: 'Sweet and sour pork' },
          { id: '203', value: 'Stir fried Tofu' },
          { id: '204', value: 'Vegetable fried rice' },
          { id: '205', value: 'Pad Thai' },
          { id: '206', value: 'Massaman beef' },
        ],
        // third group of radio-buttons
        [
          { id: '301', value: 'Peanut sauce' },
          { id: '302', value: 'Oyster sauce' },
          { id: '303', value: 'Vegetable spring rolls' },
          { id: '304', value: 'Steamed rice' },
        ],
      ],
      rules: {
        // 'Vegetarian' is NOT compatible with 'Cashew chicken', 'Sweet and sour pork', 'Massaman beef', 'Oyster sauce'
        101: [201, 202, 206, 302], 
        // 'Nut allergy' is NOT compatible with 'Cashew chicken', 'Peanut sauce',
        102: [201, 301], 
        // 'Halal' is NOT compatible with 'Sweet and sour pork',
        103: [202], 
        // 'Vegetable fried rice' is NOT compatible with 'Steamed rice' (you don't need more rice... carb overload),
        204: [304],
        // 'Pad thai' is NOT compatible with 'Steamed rice' (Pad thai comes with noodles),
        205: [304],
      }
    };
  }

  const renderMenu = (event: React.ChangeEvent<HTMLInputElement>) => {
    return (
      <div>
        {getMenu().menus.map((set, index) => {
          return (
            <fieldset>
              { set.map((opt, i) => {
                let _skip = false;
                if(selectedMenu) {
                  let _rules = getMenu().rules;
                  if(selectedMenu in _rules) {
                    // console.log(_rules[selectedMenu]); 
                    let _index = Number(selectedMenu);
                    let _rule = _rules[_index];
                    console.log(_rule);
                    console.log(_rule.includes(Number(opt.id)));
                    if(_rule.includes(Number(opt.id))) {
                      _skip=true;
                    }
                  }
                }

                if(!_skip) {
                  return (
                    <p>
                      <input
                        type="radio"
                        name="menu{index}"
                        value={opt.id}
                        id={opt.id} 
                        onChange={radioHandler}
                      />
                      <label htmlFor={opt.id}>{opt.value}</label>
                    </p>
                  );
                }                
                  
              }) }
            </fieldset>
          );
          //return <li key={index}>{value}</li>
        })}
      </div>
    );
    
    //return _html;
  }

  return (
    <div className="container">
      <h3>Please select your most favorite menu?</h3>
      {renderMenu()}
    </div>
  );
};

export default App;