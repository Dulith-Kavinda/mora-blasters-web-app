import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import SignIn from './signin';
import Registerform from './registrationform';
import JoinUs from './joinus';
import Finish from './finish';
import { auth } from '../firebase';
import { RequareDate } from '../requareDate';
import { getRegister } from '../api';
import wattermark from '../../public/watermark.png'

import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLoaderData } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger)

const steps = ['Sign In', 'Fill Form', 'Join With Us'];

export async function loader({request}){
    await RequareDate(request)
    return getRegister()
}

export default function Register() {
    const stepperRef = React.useRef()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const dd = useLoaderData()

    const getData = dd.length>0 && dd

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep(0);
    };



    const handleComplete = async () => {
        const test = await SignInFunc()
        if (test) {
            const newCompleted = completed;
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            handleNext();
        }else{
            handleBack()
        }
    };

    const SignInFunc = async () => {
        const user = auth.currentUser;

        if (user) {
            return true
        } else {
            return false
        }
        
    }

    const getStep = activeStep === 0 ? <SignIn handelNext={handleComplete} /> : activeStep === 1 ? <Registerform handelNext={handleComplete} handelData={getData}/> : <JoinUs />


    React.useEffect(() => {
        ScrollTrigger.create({
            trigger: stepperRef.current,
            start: 'top 60px',
            end: 99999,
            toggleClass: {
                className: 'stepper-scrolled',
                targets: '.stepper'
            }
        });

    }, [])

    return (
        <div className='mt-[60px] w-[100%] overflow-x-hidden'>
            <div className="w-[100%] h-[100vh] min-h-[500px] flex fixed items-center justify-center before:content-[''] before:fixed before:z-[2] before:flex before:w-[100%] before:h-[100vh] before:bg-gradient-to-t from-[#4e4f50f0] to-[#edeeeffa] before:min-h-[500px]"><img className="watermark-img  w-[600px] fixed z-[1] h-[600px]" loading='lazy' src={wattermark} /></div>
            <div className='h-[61px] bg-[#fff] relative z-[6]'>
                <h1 className='text-[25px] font-[700] absolute top-[0px] ml-[20px]'>Registration:</h1>
                <Stepper activeStep={activeStep} alternativeLabel ref={stepperRef} className='stepper relative z-[6] top-[60px] pt-[5px] duration-[0.4s] bg-white w-[100%]'>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit">
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </div>

            <div className='min-h-[calc(100vh-205px)] mt-[60px] h-auto relative z-[4] flex flex-col items-center justify-center'>
                {allStepsCompleted() ? (
                    <div className='h-auto flex flex-col items-center justify-center'>
                        <Finish />
                        All steps completed - you&apos;re finished
                    </div>
                ) : (
                    <div className='h-auto flex flex-col items-center justify-center'>
                        {getStep}
                        {activeStep > 1 && <Button onClick={handleComplete} className='absolute z-[5]' variant="contained">
                            {completedSteps() === totalSteps() - 1 && 'Finish'}
                        </Button>}
                    </div>
                )}
            </div>

        </div >
    );
}

