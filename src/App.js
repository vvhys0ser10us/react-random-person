import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await fetch(url)
      const data = await res.json()
      const {
        name,
        phone,
        email,
        dob: { age },
        picture: { large },
        login: { password },
        location: { street },
      } = data.results[0]
      setPerson({
        name: `${name.first} ${name.last}`,
        phone,
        email,
        age,
        image: large,
        password,
        address: `${street.number} ${street.name}`,
      })
      setLoading(false)
      setTitle('name')
      setValue(`${name.first} ${name.last}`)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      setTitle(e.target.dataset.label)
      setValue(person[e.target.dataset.label])
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>

            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="address"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchUser}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
