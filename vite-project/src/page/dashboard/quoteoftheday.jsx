import { Sparkles, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import quotesData from '../../data/motivational_quotes.json'
const QuoteOfTheDay = () => {
  

  const [currentQuote, setCurrentQuote] = useState("");
 const [author,setAuthor]=useState("")
   useEffect(()=>{
        const randomIndex=Math.floor(Math.random()*quotesData.length)
        const selected=quotesData[randomIndex]
        setCurrentQuote(`"${selected.quote}" `)
        setAuthor(`-${selected.author}`)
        
    },[])

  return (
    <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-4 shadow-lg h-37  flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-white" />
          <h2 className="text-lg font-bold text-white">Inspiration</h2>
        </div>
       
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 flex-1 flex flex-col justify-center">
        <p className="text-white text-sm leading-relaxed mb-2">
          {currentQuote}
        </p>
        
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
