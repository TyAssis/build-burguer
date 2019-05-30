import React from 'react';

import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

import classes from './Burguer.module.css';

const burguer = (props) => {

  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])]
        .map((_, index) => {
          return <BurguerIngredient key={ingredientKey + index} type={ingredientKey}/>;
        })
      })
      .reduce((accumulatedArray, currentArray) => {
          return accumulatedArray.concat(currentArray)
      }, []);

  if (transformedIngredients.length === 0)
      transformedIngredients = <p> Please, start adding ingredients! </p>
  return (
      <div className={classes.Burguer}>
        <BurguerIngredient type="bread-top" />
        {transformedIngredients}
        <BurguerIngredient type="bread-bottom" />
      </div>
  );

};

export default burguer;
