import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import FormMixin from '../FormMixin'
import SubmitButton from '../SubmitButton'
import {branch} from 'baobab-react/higher-order'
import {createCompanyPlanAction} from '../../actions/create-company-plan-action'
import {deleteCompanyPlanAction} from '../../actions/delete-company-plan-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import {loadCompanyAction} from '../../actions/load-company-action'

export const Plan = createReactClass({
  mixins: [FormMixin],
  displayName: 'Plan',
  propTypes: {
    plan: PropTypes.object,
    company: PropTypes.object,
    dispatch: PropTypes.func
  },
  isActive () {
    const {plan, company} = this.props
    return company.plan && company.plan.id === plan.id
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()

    const {dispatch, plan, company} = this.props
    let promise

    if (this.isActive()) {
      promise = dispatch(deleteCompanyPlanAction, company.plan.company_plan)
    } else {
      promise = dispatch(createCompanyPlanAction, company.id, plan.id)
    }

    return promise
      .then(() => dispatch(pushSuccessMessageAction))
      .then(() => dispatch(loadCompanyAction, company.id))
      .then(this.posSubmit, this.posSubmit)
  },
  render () {
    return (
      <form className='col-sm-6 col-md-4 text-center' onSubmit={this.handleSubmit}>
        <div className='thumbnail'>
          <h1 className='glyphicon glyphicon-credit-card'/>
          <div className='caption'>
            <h3>{this.props.plan.name}</h3>

            {this.isActive() ? (
              <SubmitButton
                style='zoom-out'
                color='red'
                labelMessage='cancelPlan'/>
            ) : (
              <SubmitButton
                style='zoom-out'
                color='blue'
                labelMessage='choosePlan'/>
            )}
          </div>
        </div>
      </form>
    )
  }
})

export default branch({}, Plan)
