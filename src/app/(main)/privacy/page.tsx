// app/privacy-policy/page.tsx

export default function PrivacyPolicyPage() {
	return (
		<div className="md:container px-8 py-12">
			<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

			<p className="mb-4">
				At <strong>StudyBuddy</strong>, your privacy is important to us.
				This Privacy Policy explains what information we collect, why we
				collect it, and how we handle and protect it. By using
				StudyBuddy, you agree to the practices outlined in this policy.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				1. Information We Collect
			</h2>
			<p className="mb-4">
				We collect both personal and non-personal information to help us
				deliver a better experience:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-2">
				<li>
					<strong>Personal Information:</strong> Your name, email
					address, and profile details when you register or update
					your account.
				</li>
				<li>
					<strong>Usage Data:</strong> Pages visited, features used,
					time spent on the app, and other diagnostic data.
				</li>
				<li>
					<strong>Device & Technical Information:</strong> Browser
					type, operating system, IP address, and device identifiers.
				</li>
				<li>
					<strong>Cookies:</strong> We use cookies and similar
					tracking technologies to enhance usability and track
					engagement.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				2. How We Use Your Information
			</h2>
			<p className="mb-4">
				The data we collect helps us provide, maintain, and improve our
				services. Specifically, we may use your information to:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-2">
				<li>
					Provide access to features, including personalized content
					and user profiles.
				</li>
				<li>
					Improve the performance and functionality of the platform.
				</li>
				<li>Respond to customer support inquiries or bug reports.</li>
				<li>
					Send important updates, such as policy changes, service
					modifications, or security alerts.
				</li>
				<li>
					Analyze usage trends to inform product development and UX
					improvements.
				</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				3. Data Storage and Security
			</h2>
			<p className="mb-4">
				We implement industry-standard security measures to protect your
				data from unauthorized access, alteration, disclosure, or
				destruction:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-2">
				<li>
					Data is encrypted in transit and at rest where appropriate.
				</li>
				<li>
					Access to personal information is restricted to authorized
					personnel only.
				</li>
				<li>
					We regularly review and update our infrastructure and access
					controls.
				</li>
			</ul>
			<p className="mb-4">
				Despite our best efforts, no system is 100% secure. We encourage
				users to take precautions such as using strong passwords and
				logging out after each session.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
			<p className="mb-4">
				You have certain rights regarding your personal information
				under applicable data protection laws:
			</p>
			<ul className="list-disc list-inside mb-4 space-y-2">
				<li>
					<strong>Access:</strong> Request a copy of the personal data
					we hold about you.
				</li>
				<li>
					<strong>Correction:</strong> Ask us to correct any
					inaccurate or incomplete data.
				</li>
				<li>
					<strong>Deletion:</strong> Request deletion of your personal
					information.
				</li>
				<li>
					<strong>Objection:</strong> Object to processing of your
					data for specific purposes.
				</li>
				<li>
					<strong>Portability:</strong> Request a portable copy of
					your data where applicable.
				</li>
			</ul>
			<p className="mb-4">
				To exercise these rights, please contact our support team at{' '}
				<a href="mailto:support@studybuddy.com" className="underline">
					support@studybuddy.com
				</a>
				.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				5. Data Retention
			</h2>
			<p className="mb-4">
				We retain your personal data only as long as necessary for the
				purposes outlined in this policy, or as required by law. If you
				choose to delete your account, your personal information will be
				removed from our active systems, although backup copies may
				persist for a limited period.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				6. Third-Party Services
			</h2>
			<p className="mb-4">
				We may integrate with third-party tools (e.g., analytics
				providers, authentication services). These services may collect
				data independently in accordance with their own privacy
				policies. We encourage you to review the policies of these third
				parties before interacting with them.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				7. Changes to This Policy
			</h2>
			<p className="mb-4">
				We may update this Privacy Policy from time to time. When we do,
				we will revise the “last updated” date at the bottom of the
				page. Significant changes will be communicated via email or
				in-app notification.
			</p>

			<p className="mt-8 text-sm text-gray-600">
				Last updated: June 3, 2025. By continuing to use StudyBuddy, you
				accept the terms of the most recent version of this policy.
			</p>
		</div>
	);
}
