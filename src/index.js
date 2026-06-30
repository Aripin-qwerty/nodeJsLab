import { spawn } from "node:child_process";
import { once } from "node:events";
const ls = spawn("cmd.exe", ["/c", "dir"]);

ls.stdout.on("data", (data) => {
  console.log(`stdout1: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

const [code] = await once(ls, "close");
console.log(`child process exited with code ${code}`);
