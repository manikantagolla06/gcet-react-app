import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'
export default function Product() {
  const {user} = useContext(AppContext)
  return (
    <div>
      <h3>Welcome {user.name}! </h3>
      Product List
      </div>
  )
}