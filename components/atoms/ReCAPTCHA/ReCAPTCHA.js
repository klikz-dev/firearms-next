import GoogleReCAPTCHA from 'react-google-recaptcha'

const ReCAPTCHA = ({ setRecaptchaResponse }) => {
  return (
    <GoogleReCAPTCHA
      sitekey='6LfKJgslAAAAAJxGJS0sIiwGhxpFxwyROnJZjdhN'
      onChange={(response) => setRecaptchaResponse(response)}
    />
  )
}

export default ReCAPTCHA
