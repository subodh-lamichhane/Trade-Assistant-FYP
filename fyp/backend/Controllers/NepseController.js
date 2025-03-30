import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getNepseStock = (req, res) => {
    const symbol = req.params.symbol;

    // Construct absolute path to `nepse_fetch.py`
    const scriptPath = path.join(__dirname, '../nepse_fetch.py');

    exec(`python ${scriptPath} ${symbol}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Failed to fetch NEPSE data', details: error.message });
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error in NEPSE script', details: stderr });
        }
        try {
            const data = JSON.parse(stdout);
            res.json(data);
        } catch (parseError) {
            console.error(`Parsing Error: ${parseError.message}`);
            res.status(500).json({ error: 'Invalid response from NEPSE API', details: parseError.message });
        }
    });
};

export default getNepseStock;
