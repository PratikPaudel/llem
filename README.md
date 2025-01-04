# human™ - a Large Lived Experience Model (LLEM)

A modern web application that allows users to search through an archive of human experiences using voice or text input, powered by AI-driven search and summarization capabilities.

## Features

- 🎤 **Voice Search**: Record and transcribe voice queries using OpenAI's Whisper model
- 🔍 **Smart Search**: Vector-based search using Pinecone and OpenAI embeddings
- 📝 **Query Refinement**: Automatic enhancement of search queries for better results
- 📊 **Result Summarization**: AI-powered summarization of search results with key points
- ⚡ **Real-time Processing**: Immediate feedback and processing status indicators
- 🎨 **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Tech Stack

### Backend
- FastAPI (Python web framework)
- OpenAI API (Whisper for transcription, embeddings for search)
- Pinecone (Vector database)
- Pydantic (Data validation)
- Python-dotenv (Environment management)

### Frontend
- React
- React Router
- Tailwind CSS
- Lucide Icons
- Modern JavaScript (ES6+)

## Prerequisites

Before you begin, ensure you have the following:

- Python 3.8+
- Node.js 14+
- OpenAI API key
- Pinecone API key and environment
- A configured Pinecone index

## Environment Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Create and configure the backend environment variables:
```bash
# Create .env file in the backend directory
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=your_index_name
ENVIRONMENT=development
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

### Backend
```bash
cd backend
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`

### Frontend
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`

## API Endpoints

- `POST /api/transcribe`: Transcribe audio files to text
- `GET /api/search`: Search through vector database
- `GET /api/refine`: Refine search queries
- `POST /api/summarize`: Generate summaries of search results

## Deployment

The application is configured for deployment on:
- Backend: Render
- Frontend: Vercel

Environment-specific configurations are handled in:
- Backend: `config.py`
- Frontend: `config.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the API services
- Pinecone for vector search capabilities
- The FastAPI and React communities for excellent documentation and resources
