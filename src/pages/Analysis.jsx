import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Analysis.css'
import { analyzeLocally } from '../lib/colorAnalysis'
const quizSteps = [
  {
    id: 'skin',
    question: 'What is your skin undertone?',
    hint: 'Look at the veins on your wrist. Blue/purple = cool, green = warm, both = neutral.',
    options: [
      { value: 'warm', label: 'Warm', desc: 'Golden, peachy, or yellow undertones', color: '#E8C49A' },
      { value: 'cool', label: 'Cool', desc: 'Pink, rosy, or bluish undertones', color: '#C9B8D4' },
      { value: 'neutral', label: 'Neutral', desc: 'Mix of warm and cool', color: '#C8BDB0' },
      { value: 'olive', label: 'Olive', desc: 'Greenish, muted undertones', color: '#A8A878' },
    ],
  },
  {
    id: 'eyes',
    question: 'What colour are your eyes?',
    options: [
      { value: 'blue', label: 'Blue', color: '#6A9EC5' },
      { value: 'green', label: 'Green', color: '#6A9E7A' },
      { value: 'hazel', label: 'Hazel', color: '#8E7448' },
      { value: 'brown', label: 'Brown', color: '#6B4226' },
      { value: 'dark_brown', label: 'Dark Brown', color: '#2D1A0E' },
      { value: 'grey', label: 'Grey', color: '#8A9AA4' },
    ],
  },
  {
    id: 'hair',
    question: 'What is your natural hair colour?',
    options: [
      { value: 'platinum', label: 'Platinum / White Blonde', color: '#EDE8D8' },
      { value: 'golden_blonde', label: 'Golden Blonde', color: '#D4AC5A' },
      { value: 'ash_blonde', label: 'Ash Blonde', color: '#C0B090' },
      { value: 'light_brown', label: 'Light Brown', color: '#9E7040' },
      { value: 'medium_brown', label: 'Medium Brown', color: '#6E4820' },
      { value: 'dark_brown', label: 'Dark Brown', color: '#3A2010' },
      { value: 'black', label: 'Black', color: '#1A1008' },
      { value: 'red', label: 'Red / Auburn', color: '#9E3820' },
    ],
  },
  {
    id: 'contrast',
    question: 'What is the contrast between your hair, skin, and eyes?',
    options: [
      { value: 'low', label: 'Low Contrast', desc: 'Hair, skin, and eyes are similar in depth', color: '#D4C0B0' },
      { value: 'medium', label: 'Medium Contrast', desc: 'Some difference between features', color: '#A08060' },
      { value: 'high', label: 'High Contrast', desc: 'Stark difference — e.g. dark hair, light skin', color: '#604030' },
    ],
  },
]

export default function Analysis() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [mode, setMode] = useState(null)
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) { setError('Please upload an image file.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB.'); return }
    setError('')
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files[0])
  }

  const handleQuizAnswer = (stepId, value) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }))
    if (quizStep < quizSteps.length - 1) {
      setTimeout(() => setQuizStep((s) => s + 1), 300)
    }
  }
  /*
   const analyzePhoto = () => {
     setLoading(true);
     setError("");
 
     setTimeout(() => {
       try {
         // fake answers (pošto nemamo AI)
         const randomSkin = ["warm", "cool", "neutral"];
         const randomEyes = ["brown", "blue", "green"];
         const randomHair = ["dark_brown", "black", "light_brown"];
 
         const fakeAnswers = {
           skin: randomSkin[Math.floor(Math.random() * randomSkin.length)],
           eyes: randomEyes[Math.floor(Math.random() * randomEyes.length)],
           hair: randomHair[Math.floor(Math.random() * randomHair.length)],
           contrast: "medium",
         };
 
         const result = analyzeLocally(fakeAnswers);
 
         navigate('/results', {
           state: { result, method: 'photo' },
         });
       } catch (err) {
         setError("Photo analysis failed");
       } finally {
         setLoading(false);
       }
     }, 1500);
   };*/
  const analyzePhoto = () => {
    setLoading(true)
    setError('')

    setTimeout(() => {
      const mockResult = {
        season: "Spring",
        subtype: "Warm Spring",
        undertone: "Warm",
        characteristics: "You have warm and fresh natural colouring.",
        palette: [
          { name: "Peach", hex: "#FFB7A5" },
          { name: "Golden Yellow", hex: "#FFD166" },
          { name: "Mint Green", hex: "#A8E6CF" },
          { name: "Cream", hex: "#FFE5B4" },
          { name: "Coral", hex: "#FF7F50" },
        ],
        bestColors: "Warm, light and fresh tones suit you best.",
        avoidColors: "Avoid cool, dark colours.",
        makeupTips: "Use peachy blush and warm-toned makeup.",
        celebrities: ["Zendaya", "Taylor Swift"],
      }

      navigate('/results', {
        state: { result: mockResult, method: 'photo' },
      })

      setLoading(false)
    }, 1000)
  }
  /*
  const analyzeQuiz = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      try {
        //const result = analyzeLocally(answers);
console.log("ANSWERS:", answers);
console.log("RESULT:", result);

        const result = analyzeLocally(answers || {});
        navigate('/results', {
          state: { result, method: 'quiz', answers },
        });
      } catch (err) {
        setError("Analysis failed");
      } finally {
        setLoading(false);
      }
    }, 1200); // fake AI delay
  };*/
  const analyzeQuiz = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      try {
        if (!answers.skin || !answers.eyes || !answers.hair || !answers.contrast) {
          throw new Error("Missing answers");
        }

        const result = analyzeLocally(answers);

        navigate('/results', {
          state: { result, method: 'quiz', answers },
        });
      } catch (err) {
        console.error(err); // 🔥 VAŽNO
        setError("Analysis failed");
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const currentStep = quizSteps[quizStep]
  const quizComplete = Object.keys(answers).length === quizSteps.length

  if (!mode) {
    return (
      <div className="analysis-page">
        <div className="container">
          <div className="analysis-hero fade-up">
            <h1>Your Colour Analysis</h1>
            <p>Choose how you'd like to discover your seasonal palette.</p>
          </div>
          <div className="mode-grid fade-up" style={{ animationDelay: '0.1s' }}>
            <button className="mode-card" onClick={() => alert("Photo analysis coming soon!")}>
              <div className="mode-icon">📸</div>
              <h3>Photo Analysis</h3>
              <p>Upload a photo and let our AI analyse your natural colouring for the most accurate result.</p>
              <span className="mode-tag">Recommended</span>
            </button>
            <button className="mode-card" onClick={() => setMode('quiz')}>
              <div className="mode-icon">✏️</div>
              <h3>Colour Quiz</h3>
              <p>Answer a few questions about your skin, eyes, and hair to discover your season.</p>
              <span className="mode-tag mode-tag-alt">4 questions</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (mode === 'photo') {
    return (
      <div className="analysis-page">
        <div className="container">
          <button className="back-btn" onClick={() => { setMode(null); setImageFile(null); setImagePreview(null) }}>← Back</button>
          <div className="analysis-hero fade-up">
            <h1>Photo Analysis</h1>
            <p>Upload a clear, well-lit photo of your face for the best results.</p>
          </div>
          <div className="photo-area fade-up" style={{ animationDelay: '0.1s' }}>
            <div
              className={`dropzone ${dragOver ? 'drag-over' : ''} ${imagePreview ? 'has-image' : ''}`}
              onClick={() => !imagePreview && fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="preview-wrap">
                  <img src={imagePreview} alt="Preview" className="preview-img" />
                  <button className="preview-remove" onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null) }}>✕ Remove</button>
                </div>
              ) : (
                <div className="dropzone-inner">
                  <div className="dropzone-icon">⬆</div>
                  <p className="dropzone-text">Drop your photo here</p>
                  <p className="dropzone-sub">or click to browse — JPG, PNG, up to 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileSelect(e.target.files[0])} />
            <div className="photo-tips">
              <h4>Tips for best results</h4>
              <ul>
                <li>Use natural daylight, avoid flash</li>
                <li>No filters or heavy makeup</li>
                <li>Face should be clearly visible</li>
                <li>Avoid coloured backgrounds if possible</li>
              </ul>
            </div>
          </div>
          {error && <p className="analysis-error">{error}</p>}
          {imagePreview && (
            <div className="analysis-action fade-up">
              <button className="btn btn-primary btn-lg" onClick={analyzePhoto} disabled={loading}>
                {loading ? <><span className="loader" /> Analysing your colours…</> : 'Analyse My Colours →'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="analysis-page">
      <div className="container">
        <button className="back-btn" onClick={() => { setMode(null); setAnswers({}); setQuizStep(0) }}>← Back</button>
        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${((quizStep + (answers[currentStep?.id] ? 1 : 0)) / quizSteps.length) * 100}%` }} />
          </div>
          <span className="quiz-step-label">{quizStep + 1} / {quizSteps.length}</span>
        </div>

        {!quizComplete ? (
          <div className="quiz-step fade-up" key={quizStep}>
            <h2 className="quiz-question">{currentStep.question}</h2>
            {currentStep.hint && <p className="quiz-hint">{currentStep.hint}</p>}
            <div className={`quiz-options quiz-options-${currentStep.options.length}`}>
              {currentStep.options.map((opt) => (
                <button key={opt.value} className={`quiz-option ${answers[currentStep.id] === opt.value ? 'selected' : ''}`} onClick={() => handleQuizAnswer(currentStep.id, opt.value)}>
                  <div className="option-swatch" style={{ background: opt.color }} />
                  <div className="option-text">
                    <strong>{opt.label}</strong>
                    {opt.desc && <span>{opt.desc}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-complete fade-up">
            <div className="quiz-complete-icon">✓</div>
            <h2>Quiz Complete!</h2>
            <p>We have everything we need. Ready to reveal your season?</p>
            <div className="quiz-summary">
              {quizSteps.map((step) => (
                <div key={step.id} className="summary-item">
                  <span className="summary-label">{step.id}</span>
                  <span className="summary-value">{answers[step.id]?.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
            {error && <p className="analysis-error">{error}</p>}
            <button className="btn btn-primary btn-lg" onClick={analyzeQuiz} disabled={loading}>
              {loading ? <><span className="loader" /> Analysing…</> : 'Reveal My Season →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}