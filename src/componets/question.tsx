const data=[
  {
    question: "What activity do you enjoy the most?",
    options: [
      { text: "Solving puzzles or building things", "type": "A" },
      { text: "Helping others and caring for their needs", "type": "B" },
      { text: "Leading a team or organizing events", "type": "C" },
      { text: "Drawing, writing, or creating music", "type": "D" }
    ]
  },
  {
    question: "Which subject did you enjoy most in school?",
    options: [
      { text: "Math or Science", type: "A" },
      { text: "Biology or Social Studies", type: "B" },
      { text: "Business or Economics", type: "C" },
      { text: "Literature or Art", type: "D" }
    ]
  },
  {
    question: "What kind of work environment do you prefer?",
    options: [
      { text: "Quiet and focused, working on computers or data", type: "A" },
      { text: "Busy and people-focused, like hospitals or schools", type: "B" },
      { text: "Fast-paced and dynamic, like offices or startups", type: "C" },
      { text: "Open and expressive, like studios or stages", type: "D" }
    ]
  },
  {
    question: "How do you usually solve problems?",
    options: [
      { text: "Analyze it logically and find a technical solution", type: "A" },
      { text: "Talk it through and offer emotional support", type: "B" },
      { text: "Find a practical and efficient way to get it done", type: "C" },
      { text: "Think creatively and explore different ideas", type: "D" }
    ]
  },
  {
    question: "What motivates you the most?",
    options: [
      { text: "Creating innovative solutions or new technology", type: "A" },
      { text: "Making a difference in someone’s life", "type": "B" },
      { text: "Achieving goals and gaining recognition", type: "C" },
      { text: "Expressing yourself and inspiring others", type: "D" }
    ]
  },
  {
    question: "If you could choose a weekend project, which one would it be?",
    options: [
      { text: "Building a website or repairing electronics", type: "A" },
      { text: "Volunteering at a clinic or teaching kids", type: "B" },
      { text: "Starting an online store or planning an event", type: "C" },
      { text: "Painting a mural or writing a short story", type: "D" }
    ]
  },
  {
    question: "How do you feel about working with technology?",
    options: [
      { text: "I love it—I enjoy programming, gadgets, or systems", type: "A" },
      { text: "I use it when needed, mostly for communication or records", type: "B" },
      { text: "I use it for business, marketing, or organization", type: "C" },
      { text: "I use it to design, edit, or share creative work", type: "D" }
    ]
  },
  {
    question: "Which task sounds most enjoyable to you?",
    options: [
      { text: "Writing code to solve a complex problem", type: "A" },
      { text: "Talking to someone to understand their feelings", type: "B" },
      { text: "Pitching an idea to potential clients", type: "C" },
      { text: "Shooting or editing a creative video", type: "D" }
    ]
  },
  {
    question: "What role do you usually take in group projects?",
    options: [
      { text: "The planner or technical contributor", type: "A" },
      { text: "The communicator and team support", type: "B" },
      { text: "The leader or decision-maker", type: "C" },
      { text: "The idea generator or designer", type: "D" }
    ]
  },
  {
    question: "What type of success matters most to you?",
    options: [
      { text: "Building something useful and functional", type: "A" },
      { text: "Positively impacting someone’s life", type: "B" },
      { text: "Reaching high positions or financial goals", type: "C" },
      { text: "Being recognized for creative expression", type: "D" }
    ]
  },
  {
    "question": "How do you approach learning something new?",
    "options": [
      { text: "Research deeply and test it logically", type: "A" },
      { text: "Learn from experience or asking others", type: "B" },
      { text: "Take the quickest route to apply it", type: "C" },
      { text: "Explore different methods and styles", type: "D" }
    ]
  },
  {
    question: "Which of these would you rather do on your day off?",
    options: [
      { text: "Tinker with gadgets or build a model", type: "A" },
      { text: "Visit someone and talk about life", type: "B" },
      { text: "Work on a side hustle or plan a trip", type: "C" },
      { text: "Take photos or write poetry", type: "D" }
    ]
  },
  {
    question: "What do people often compliment you for?",
    options: [
      { text: "Being smart or good at solving problems", type: "A" },
      { text: "Being kind and a good listener", type: "B" },
      { text: "Being ambitious and driven", type: "C" },
      { text: "Being imaginative or expressive",type: "D" }
    ]
  },
  {
    question: "What kind of job title sounds most exciting to you?",
    options: [
      { text: "Software Engineer or Data Analyst", type: "A" },
      { text: "Nurse or Social Worker", type: "B" },
      { text: "Project Manager or Entrepreneur", type: "C" },
      { text: "Graphic Designer or Film Director", type: "D" }
    ]
  },
  {
    question: "What type of tasks do you avoid the most?",
    options: [
      { text: "Speaking in front of big crowds", type: "A" },
      { text: "Working with machines or tech", type: "B" },
      { text: "Long, repetitive tasks with no results", type: "C" },
      { text: "Strict procedures or rules", type: "D" }
    ]
  },
  {
    question: "What kind of impact do you want to have on the world?",
    options: [
      { text: "Solve real-world problems using technology", type: "A" },
      { text: "Improve lives and communities", type: "B" },
      { text: "Drive innovation and grow businesses", type: "C" },
      { text: "Inspire people through creativity", type: "D" }
    ]
  }
]



function Quick(){

    return(
        <div className="md:grid md:grid-cols-3 grid-cols-1 gap-3">
            {data.map((item, index)=>(
                <div key={index} className="flex flex-col gap-2">
                    <div className="flex gap-3 text-xl">
                        <p>{index}</p>  
                        <h1>{item.question}</h1>
                    </div>
                    <ul className="gap-2">
                        <li className="gap-2">{item.options.map((items,indexz)=>(
                            <div key={indexz} className="flex gap-3">
                                <input type="checkbox" name={items.type} id={items.type} />
                                <p >{items.text}</p>
                            </div>
                        ))}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}
export default Quick