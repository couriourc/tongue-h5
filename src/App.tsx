import { useState, useRef } from 'react'
import './App.css'
import { Camera } from "react-camera-pro";

function App() {

  const camera = useRef<any>(null);
  const [image, setImage] = useState<string>("");
  return (
    <>
      <div className='flex flex-col'>
        <Camera ref={camera}
          errorMessages={{
          }}
        />
        <button onClick={() => setImage(camera.current!.takePhoto())}>Take photo</button>
        {image && <img src={image!} alt='Taken photo' />}
      </div>
    </>
  )
}

export default App
