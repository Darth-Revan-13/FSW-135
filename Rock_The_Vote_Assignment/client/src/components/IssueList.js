import React from 'react'
import Issue from './Issue.js'

export default function IssueList(props){
  const {issue} = props
  return (
    <div className="issue-list">
      {issue.map(issue => <Issue key={issue._id} {...issue}/>)}
    </div>
  )
}