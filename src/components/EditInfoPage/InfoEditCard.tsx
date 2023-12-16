import React from 'react'
import InfoEditInputTag from './InfoEditInputTag'

const InfoEditCard = () => {
  return (
    <div className='mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl'>
      <span className="font-k2d text-3xl">Edit My info</span>
      <InfoEditInputTag inputType={{
        type: 'email',
        placeholder: 'kimgoorm@gmail.com',
        label: 'email'
      }} value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.')
      } } />
      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'kimgoorm@gmail.com',
        label: 'nickname'
      }} value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.')
      } } />
      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'Seoul, Korea',
        label: 'address'
      }} value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.')
      } } />
      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'I am a developer',
        label: 'bio'
      }} value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.')
      } } />
    </div>
  )
}

export default InfoEditCard
