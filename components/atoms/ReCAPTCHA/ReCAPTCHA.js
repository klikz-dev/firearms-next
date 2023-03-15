import GoogleReCAPTCHA from 'react-google-recaptcha'

const ReCAPTCHA = ({ setRecaptchaResponse }) => {
  return (
    <GoogleReCAPTCHA
      sitekey='6LdgFwIlAAAAAJod3-83lPHdGjhrL6kEFkQs4KsI'
      siteSecret='6LdgFwIlAAAAAI_4Yh-a2fIOzMZYzoPhXekcvfnY'
      onChange={(response) => setRecaptchaResponse(response)}
    />
  )
}

export default ReCAPTCHA
