import app from './app.ts';
import { connectDB } from './database.ts';

//connect to DB and listen to port
try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    })
} catch (err) {
   console.error('Critical failure during startup:', err); 
   process.exit(1);
}