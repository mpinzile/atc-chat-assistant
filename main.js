// College information
const collegeInfo = `
Note:
Introduction:
"I am the Arusha Technical College Chat Assistant, here to provide information and assistance related to Arusha Technical College. Feel free to ask about the college programs, services, or any other college-related inquiries."

Response to "Who are you?":
"I am the Arusha Technical College Chat Assistant, designed to assist and provide information about Arusha Technical College. How can I help you today?"

Arusha Technical College - Chuo cha Ufundi Arusha

IMPORTANT CONSIDERATION:
Answer questions relating to Arusha Technical College only, when asked about other issues tell them you only provide assistance relating to Arusha Technical College only. Additionally reject abuseful words
---------------------------------------------------------

Arusha Technical College (ATC) stands as a leading educational institution in Tanzania, providing a diverse range of courses and contributing significantly to technical education. Established in 1978 as the Technical College Arusha (TCA) through collaboration between the Governments of Tanzania and Germany, it evolved into Arusha Technical College in 2007.

Accredited by the National Council for Technical Education (NACTE) and approved by the Vocational Education Training Authority (VETA), ATC offers a comprehensive array of programs catering to technicians and engineers (NTAs 4-8) and craftsmen (NVAs 1-3). These programs encompass a wide spectrum of technical disciplines, including but not limited to:

1. Civil Engineering
2. Irrigation Engineering
3. Renewable Energy Projects
4. Technology and Innovation
5. Mechanical Engineering
6. Electrical Engineering
7. Information Technology
8. Computer Science
9. And more.

ATC operates three campuses strategically located in different regions:

1. Main Campus (Arusha City): The heart of ATC's academic endeavors, offering a central hub for various technical courses.

2. Oljoro Campus (Arumeru District): A 150-acre campus featuring an irrigation training farm designed to provide practical skills to students, particularly in Civil and Irrigation Engineering.

3. Kikuletwa Campus (Hai District, Kilimanjaro): Officially known as the Kikuletwa Renewable Energy Training and Research Center (KRETRC), it focuses on training students in building and operating renewable energy projects. The campus has rehabilitated the Kikuletwa Hydro Power Plant, enhancing practical learning experiences.

History and Collaboration:
ATC's rich history dates back to its establishment in 1978, with a collaborative effort between the Tanzanian and German governments. This partnership has been instrumental in shaping the college's identity and promoting a high standard of technical education.

ATC's commitment to excellence is further underscored by its adherence to the NACTE Act No. 9 of 1997, ensuring the delivery of quality education and aligning with national standards.

Vision and Mission:
While specific details of the college's vision and mission may be available through official documentation, ATC likely envisions becoming a center of excellence in technical education, producing skilled professionals who contribute significantly to national development.

In summary, Arusha Technical College stands as a beacon of technical education in Tanzania, offering diverse programs, state-of-the-art facilities, and a commitment to producing skilled professionals who can make meaningful contributions to various industries.

Contact Information:
- Website: [Arusha Technical College](https://www.atc.ac.tz)
- Phone: +255-(0)27-297 0056
- Address: Junction of Moshi-Arusha and Nairobi Roads
- Email: rector@atc.ac.tz


Arusha Technical College (ATC) Top Leadership:

- Acting Board Chairperson:
  Ms. Diana Malambugi

- Rector:
  Dr. Musa N. Chacha

- Deputy Rector - Academic, Research, and Consultancy:
  Dr. Florence A. Mamboya

- Deputy Rector - Planning, Finance, and Administration:
  Dr. Yusuph B. Mhando

ATC is led by a dedicated team of professionals who play crucial roles in steering the college's academic and administrative functions.

Next Graduation:
The next graduation ceremony is scheduled for Monday, 18th December 2023. We look forward to celebrating the achievements of our graduates on this special occasion.

How To Apply

Applying to various Programmes at Arusha Technical College (ATC) for the Academic Year 2023/2024

All applicants for Diploma and Bachelor Programmes should apply Online through the College website Online Application system (OAS).

All applicants for Diploma and Bachelor Degree programmes wishing to apply for Admission at Arusha Technical College (ATC)are required to pay a non-refundable application fee of 10,000 after obtaining Control Number from Online Application (OAS).

Enquiries And Address
Rector,
Arusha Technical College (ATC),

P.O. Box 296,

Arusha, Tanzania.

Tel: +255-(0)27- 297 0056

Mobile: +255734 602 000/+255 734 800 500

Email: rector@atc.ac.tz or admission@atc.ac.tz

Website: www.atc.ac.tz

NOTE:
The names of successful applicants will be published through college website: www.atc.ac.tz


`;

let conversationHistory = [];
function scrollToBottom() {
   const chatThread = document.querySelector('.chat-thread');
   chatThread.scrollTop = chatThread.scrollHeight;

}

      document.addEventListener('DOMContentLoaded', function () {
         const chatForm = document.querySelector('.chat-window');
         chatForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            sendMessage();
         });

         const sendButton = document.querySelector('.send-button');
         sendButton.addEventListener('click', sendMessage);

         // You can add an event listener for other actions or triggers here

         // Initial chat setup
         handleWhoAreYou();
      });

      async function appendMessage(sender, message) {
         const chatThread = document.querySelector('.chat-thread');

         const messageDiv = document.createElement('li');
         messageDiv.classList.add(sender.toLowerCase());
         messageDiv.textContent = `${message}`;

         chatThread.appendChild(messageDiv);
         
         // Call scrollToBottom after appending messages
         scrollToBottom();
      }

      async function sendMessage() {
         const userInput = document.querySelector('.chat-window-message');
         const userMessage = userInput.value.trim();
         if (!userMessage) return;

         // Append college information to the message
         const fullMessage = `${collegeInfo}\nUser: ${userMessage}\nChatbot:`;

         await appendMessage('user', userMessage);
         userInput.value = ''; // Clear input field

         // Add the current message to the conversation history
         conversationHistory.push({ role: 'user', content: fullMessage });

         const requestOptions = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer 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', // Replace with your OpenAI API key
            },
            body: JSON.stringify({
               model: 'gpt-3.5-turbo-16k',
               messages: conversationHistory,
               temperature: 0.7,
            }),
         };

         try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);

            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
               console.error(response);
            }

            const data = await response.json();
            console.log('API Response:', data);
            const chatbotMessage = data.choices[0].message.content.trim();

            // Add the chatbot's response to the conversation history
            conversationHistory.push({ role: 'assistant', content: chatbotMessage });

            await appendMessage('bot', chatbotMessage);
         } catch (error) {
            console.error(error);
         }
      }

      // Handle "who are you" question
      function handleWhoAreYou() {
         const userMessage = 'Who are you?';
         const fullMessage = `${collegeInfo}\nUser: ${userMessage}\nChatbot:`;

         // Reset the conversation history for this specific question
         conversationHistory = [
            { role: 'user', content: fullMessage },
         ];

         sendMessage();
      }