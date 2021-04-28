export default async function ({ env, req, redirect, store }) {
  try {
    if (process.server) {
      console.log('checking auth for the first time when page renders on server.')
      if (!req || req.headers.authorization) {
        console.log('Auth Error in request ', req)
        return redirect('/')
      }
      //   const token = req.headers.authorization
      //   const secret = env.secretKey
      return
    } else {
      return
    }
  } catch (err) {
    console.log('#### Exception###')
    console.log('Auth Error in request \n ', req)
    console.log(err)
    return redirect('/')
  }
}
