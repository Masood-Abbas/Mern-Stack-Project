import { useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify';

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  
  const [userData,setUserData]=useState(true)

  const {user}=useAuth()

  if(userData&&user){
    setContact({
      username:user.username,
      email:user.email,
      message:""
    })
    setUserData(false)
  }
  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res=await fetch("http://localhost:5000/api/form/contact",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
        }
      )
      if(res.ok){
        setContact({
          message:""
        })
        const resData=await res.json()
        toast.success("Send Message successfully")
        console.log(resData);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="conact image" height="500" width="500" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d601.1015980447916!2d74.27309094694584!3d31.542169077488843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903259e45abb3%3A0x2de2fabd0f944939!2sMoosa%20BBQ!5e0!3m2!1sen!2s!4v1703308485446!5m2!1sen!2s"
          width="100%"
          height="250"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        </section>
      </section>
    </>
  );
};

// export default Contact;
