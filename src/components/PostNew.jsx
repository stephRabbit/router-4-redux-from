import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {
  renderField(field) {
    // field.meta.pristine,
    // field.meta.touched,
    // field.meta.invalid - input states
    const { meta: { touched, error } } = field;
    const className = `form-group${touched && error ? ' has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    // history is connect to react-router
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // reduxForm props added reduxForm({...})(PostNew)
    // handleSubmit deals with redux form process (validation etc)
    // argument is a callback function that handled in class (onSubmit(values))
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          component={this.renderField}
          name="title"
          label="Title"
        />
        <Field
          component={this.renderField}
          name="categories"
          label="Categories"
        />
        <Field
          component={this.renderField}
          name="content"
          label="Content"
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          submit
        </button>
        <Link
          className="btn btn-danger btn-gap"
          to="/"
        >
          Cancel
        </Link>
      </form>
    );
  }
}

// Values user input form fields
function validate(values) {
  const errors = {};

  // Validate errors from values

  if (! values.title) {
    errors.title = 'Please enter a title!'
  }

  if (! values.categories) {
    errors.categories = 'Please enter a category!'
  }

  if (! values.content) {
    errors.content = 'Enter some content please!'
  }

  // if errors is empty, form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  form: 'PostNewForm',
  validate
})(
  connect(null, { createPost })(PostNew)
);
