import React from 'react'
import FormMixin from '@tetris/front-server/lib/mixins/FormMixin'
import SubmitButton from '@tetris/front-server/lib/components/SubmitButton'
import {branch} from 'baobab-react/higher-order'
import {createCompanyPlanAction} from '../../actions/create-company-plan-action'
import {deleteCompanyPlanAction} from '../../actions/delete-company-plan-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import {loadCompanyAction} from '../../actions/load-company-action'

const {PropTypes} = React

export const Plan = React.createClass({
  mixins: [FormMixin],
  displayName: 'Plan',
  propTypes: {
    plan: PropTypes.object,
    company: PropTypes.object,
    actions: PropTypes.shape({
      cancelPlan: PropTypes.func,
      selectPlan: PropTypes.func,
      notifySuccess: PropTypes.func,
      reloadCompany: PropTypes.func
    })
  },
  isActive () {
    const {plan, company} = this.props
    return company.plan && company.plan.id === plan.id
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()
    const {plan, company, actions} = this.props
    let promise

    if (this.isActive()) {
      promise = actions.cancelPlan(company.plan.company_plan)
    } else {
      promise = actions.selectPlan(company.id, plan.id)
    }

    return promise
      .then(() => actions.notifySuccess())
      .then(() => actions.reloadCompany(company.id))
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

export default branch(Plan, {
  actions: {
    selectPlan: createCompanyPlanAction,
    cancelPlan: deleteCompanyPlanAction,
    notifySuccess: pushSuccessMessageAction,
    reloadCompany: loadCompanyAction
  }
})
