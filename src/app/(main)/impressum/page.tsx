// app/impressum/page.tsx

export default function ImpressumPage() {
	return (
		<div className="md:container px-8 py-12">
			<h1 className="text-3xl font-bold mb-6">Impressum</h1>

			<p className="mb-4">
				This website is operated by <strong>StudyBuddy</strong>. In
				accordance with §5 TMG and other applicable regulations, the
				following legal information is provided below.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Legal Entity</h2>
			<p className="mb-4">
				<strong>StudyBuddy Inc.</strong>
				<br />
				Registered in the Commercial Register of Knowledge City
				<br />
				Registration Number: HRB 123456
				<br />
				VAT Identification Number: DE123456789
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				Contact Information
			</h2>
			<p className="mb-4">
				StudyBuddy Inc.
				<br />
				123 Learning Lane
				<br />
				10000 Knowledge City, Germany
				<br />
				Phone: +49 (0)123 456789
				<br />
				Email:{' '}
				<a href="mailto:contact@studybuddy.app" className="underline">
					contact@studybuddy.app
				</a>
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Represented By</h2>
			<p className="mb-4">
				Jane Doe
				<br />
				Chief Executive Officer (CEO)
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				Editorial Responsibility
			</h2>
			<p className="mb-4">
				Jane Doe
				<br />
				StudyBuddy Inc.
				<br />
				123 Learning Lane
				<br />
				10000 Knowledge City
				<br />
				Email:{' '}
				<a href="mailto:editorial@studybuddy.app" className="underline">
					editorial@studybuddy.app
				</a>
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				Dispute Resolution
			</h2>
			<p className="mb-4">
				The European Commission provides a platform for Online Dispute
				Resolution (ODR):{' '}
				<a
					href="https://ec.europa.eu/consumers/odr"
					target="_blank"
					rel="noopener noreferrer"
					className="underline"
				>
					https://ec.europa.eu/consumers/odr
				</a>
				. We are not obligated or willing to participate in a dispute
				settlement procedure before a consumer arbitration board.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
			<p className="mb-4">
				Despite careful content control, we assume no liability for the
				content of external links. The operators of the linked pages are
				solely responsible for their content. We are also not liable for
				the accuracy, completeness, or timeliness of information on this
				website.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">
				Copyright and Image Credits
			</h2>
			<p className="mb-4">
				All content and works published on this website are governed by
				the copyright laws of Germany. Any reproduction, editing,
				distribution, or use outside the scope of copyright law requires
				the written consent of the author or creator. Where content from
				third parties is used, their respective copyrights are
				acknowledged.
			</p>

			<p className="mt-8 text-sm text-gray-600">
				This Impressum complies with §5 TMG (German Telemedia Act) and
				is valid as of June 3, 2025.
			</p>
		</div>
	);
}
