import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { StepperStyleProvider } from "./stepper/StepperStyleProvider";
import LandingPage from "./pages/LandingPage";
import FormShowcasePage from "./pages/FormShowcasePage";
import ShowcaseNav from "./components/ShowcaseNav";
import { formConfig as freelanceIntakeConfig } from "./config/form";
import { speakerSubmissionConfig } from "./config/speakerSubmission";
import { warrantyClaimConfig } from "./config/warrantyClaim";

function App() {
	return (
		<ThemeProvider>
			<StepperStyleProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route
							path="/freelance-intake"
							element={
								<>
									<ShowcaseNav />
									<FormShowcasePage config={freelanceIntakeConfig} />
								</>
							}
						/>
						<Route
							path="/speaker-submission"
							element={
								<>
									<ShowcaseNav />
									<FormShowcasePage config={speakerSubmissionConfig} />
								</>
							}
						/>
						<Route
							path="/warranty-claim"
							element={
								<>
									<ShowcaseNav />
									<FormShowcasePage config={warrantyClaimConfig} />
								</>
							}
						/>
					</Routes>
				</BrowserRouter>
			</StepperStyleProvider>
		</ThemeProvider>
	);
}

export default App;
