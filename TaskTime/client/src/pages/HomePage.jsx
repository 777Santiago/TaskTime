import React from 'react';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to TaskTime</h1>
          <p className="text-lg mb-8">Powering your journey towards productivity and efficiency</p>
          <p className="text-lg mb-1">Developed by:</p>
          <p className="text-lg mb-0">Eduwin Puin</p>
          <p className="text-lg mb-0">Daniel Arcila</p>

        </div>
      </section>

      {/* About Section */}
      <section className="bg-white text-gray-900 h-screen flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">About TaskTime</h2>
          <p className="text-lg mb-8">
          TaskTime is dedicated to providing an efficient task management app to help you organize your work seamlessly, from studies to projects, making use of the best study techniques.          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 text-white h-screen flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc text-lg mb-8">
            <li>Task Organization: Effortlessly manage and prioritize your tasks.</li>
            <li>Pomodoro: The application integrates the pomodoro technique with which you can have an efficient approach when carrying out your tasks.</li>
            <li>Simplicity: The application has a simple and elegant structure that seeks intuitive handling without overwhelming.</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white text-gray-900 h-screen flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Contact TaskTime</h2>
          <p className="text-lg mb-8">
            Have questions or want to know more? Contact us at{' '}
            <a href="mailto:info@tasktime.com" className="text-blue-500">info@tasktime.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
