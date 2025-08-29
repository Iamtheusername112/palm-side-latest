// import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='flex justify-center'>
            <div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-3xl'>P</span>
            </div>
          </div>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>
            Admin Sign In
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Access your Palmside Real Estate admin dashboard
          </p>
        </div>

        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {/* <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-blue-600 hover:bg-blue-700 text-sm font-semibold py-2 px-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                card: 'shadow-none',
                headerTitle: 'text-gray-900 text-lg font-semibold',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton:
                  'w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50',
                formFieldInput:
                  'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                formFieldLabel: 'block text-sm font-medium text-gray-700',
                footerActionLink:
                  'font-medium text-blue-600 hover:text-blue-500',
                dividerLine: 'bg-gray-200',
                dividerText: 'text-gray-500 text-sm',
              },
            }}
            redirectUrl='/admin'
          /> */}
          <div className='text-center py-8'>
            <p className='text-gray-600 mb-4'>
              Authentication temporarily disabled
            </p>
            <button
              onClick={() => window.history.back()}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md'
            >
              Go Back
            </button>
          </div>
        </div>

        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            Only authorized administrators can access this area
          </p>
        </div>
      </div>
    </div>
  )
}
