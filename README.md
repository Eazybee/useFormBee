<div align="center">
<h1>useFormBee</h1>

<a href="https://www.emojione.com/emoji/1f989">
  <img
    height="80"
    width="80"
    alt="owl"
    src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/46520271_2143919952537259_6137294672965402624_o.png?_nc_cat=106&_nc_oc=AQmkRe0pNN2W6XUOobH_m5wkJpRRhFxu3UJCUwgL21tTvHVDvAqRoDR43GP47-Vmhxo&_nc_ht=scontent-lht6-1.xx&oh=bf069a21d65b435c567b576e9284ccb5&oe=5DD222FF"
  />
</a>

<p>This is a react form handler</p>

</div>

<hr />

[![Build Status](https://travis-ci.com/Eazybee/useFormBee.svg?branch=develop)](https://travis-ci.com/Eazybee/useFormBee) <a href="https://codeclimate.com/github/Eazybee/useFormBee/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d103b30217999d81e940/test_coverage" /></a> <a href="https://codeclimate.com/github/Eazybee/useFormBee/maintainability"><img src="https://api.codeclimate.com/v1/badges/d103b30217999d81e940/maintainability" /></a> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![NPM Version](https://img.shields.io/badge/npm-v1.0.0-blue)](http://makeapullrequest.com) 


## The problem
Handling forms in react can be a little bit tedious especially for new beginners like me 😃.  **I often find myself re-writing the same stateful logic and form validations**, especially when I have different forms in different components (such as _signup, login, profile update form_).

## Inspiration
My mentor <a href='https://github.com/benfluleck'>@benfluleck</a> suggested I abstract my form logic so that it can easily be reusable. I created a useForm hook and showed it to him and my other colleague. To my surprise, they loved it and adviced that I made some improvements on it and also upload it to [npm](https://npmjs.com) as a library. 

## The solution
**useFormBee** is a custom react hook that helps me manage and abstract form logic.<br>
Form logic such as
- values
- onChange
- onSubmit
- onReset

Harnessing the power of <a href='https://www.npmjs.com/package/validatorjs'>validatorjs</a>, I integrated validations to the useForm hooks.
<hr>

## Installation 
This module is distributed via <a href='https://www.npmjs.com/'>npm</a>

```bash
npm install useformbee
```

## Usage
##### Import
```javascript
import useFormBee from 'useformbee';
```

```javascript
const { values, errors, handleChange, handleSubmit, handleReset } = useFormBee({ callback, rules }); 
```
##### Parameter
useformbee takes an object as its parameter. The object parameter must have two attribute `callback` and `rules`.

- The `callback` is the function that will be called when the form is submitted and passes all validation. 

- The `rules` is an object of <a href='https://www.npmjs.com/package/validatorjs'>validatorjs</a> rules

##### Returns
useformbee returns an object of 5 attributes.
- values (object)
- errors (object)
- handleChange (function)
- handleSubmit (function)
- handleReset (function)

## Form Example
```javascript
const Form = () => {
  // prepare your inputs rules
  // read more about validatorjs rule -> https://www.npmjs.com/package/validatorjs
  const rules = {
    firstName: 'alpha|required',
    age: 'numeric',
  };

  //create you callback function
  const saveToDB = (values) => {
    console.log(values);
    // ...your logic
  };

  const {
    values, handleChange, handleSubmit, errors, handleReset,
  } = useFormBee({ callback: saveToDB, rules });

  //destructure field values
  // the values is created from Object.keys(rules)
  const { firstName, age } = values;

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type='text'
        value ={firstName}
        onChange={handleChange}
        name='firstName'
        required
      />
      {/* display username error  if there is an error */}
      {errors.firstName && <p>{errors.firstName }</p>}
      <br />
    
      <input
        type='text'
        value ={age}
        onChange={handleChange}
        name='age'
      />
      {/* display age error  if there is an error */}
      {errors.age && <p>{errors.age}</p>}
      <br />
      <button type='submit'>Submit</button>
      <button type='reset'>Reset</button>
    </form>
  );
};
```

## Contributors

Thanks goes to these people <a href='https://allcontributors.org/docs/en/emoji-key'>(emoji key)</a>

<table>
  <tr>
    <td align="center"><a href="https://github.com/benfluleck"><img src="https://avatars3.githubusercontent.com/u/36575414?s=460&v=4" width="100px;" alt="Ezekiel Ilori"/><br /><sub><b>Ezekiel Ilori</b></sub></a><br /><a href="#" title="Idea">🤔</a> <a href="#" title="Code">💻</a> <a href="#" title="Tests">⚠️</a> <a href="#" title="Doc">📖</a></td>
    <td align="center"><a href="https://github.com/benfluleck"><img src="https://avatars0.githubusercontent.com/u/26222856?s=400&v=4" width="100px;" alt="Benny Ogidan"/><br /><sub><b>Benny Ogidan</b></sub></a><br /><a href="#" title="Review">👀</a> <a href="#" title="Tests">⚠️</a></td>
  </tr>
</table>

## LICENSE
- MIT