import app from './app.ts';
import { connectDB } from './database.ts';

//connect to DB and listen to port
try {
    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`);
    })
} catch (err) {
   console.error('Critical failure during startup:', err); 
   process.exit(1);
}