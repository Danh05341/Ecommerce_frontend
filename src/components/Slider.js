import slider1 from '../assets/images/slider_1.webp'

const Slider = (props) => {
  return (
    <div className='w-full flex'>
        <img src={props.slider} alt='slider' className='m-auto'/>
    </div>
  )
}

export default Slider