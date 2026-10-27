var __CM_FILENAME__ = typeof __filename !== "undefined" ? __filename : require("node:path").resolve(process.argv[1] || "");
var __CM_DIRNAME__ = typeof __dirname !== "undefined" ? __dirname : require("node:path").dirname(__CM_FILENAME__);
var __IMPORT_META_URL__ = require("node:url").pathToFileURL(__CM_FILENAME__).href;
"use strict";var he=Object.defineProperty;var Os=Object.getOwnPropertyDescriptor;var gs=Object.getOwnPropertyNames;var Ns=Object.prototype.hasOwnProperty;var fs=(n,e)=>{for(var t in e)he(n,t,{get:e[t],enumerable:!0})},Cs=(n,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of gs(e))!Ns.call(n,r)&&r!==t&&he(n,r,{get:()=>e[r],enumerable:!(s=Os(e,r))||s.enumerable});return n};var Is=n=>Cs(he({},"__esModule",{value:!0}),n);var Mr={};fs(Mr,{SessionStore:()=>et,TELEGRAM_WRAPUP_CLAIM_STALE_AFTER_MS:()=>As,rollupObservationFileLists:()=>Rs});module.exports=Is(Mr);var Ls=new Set;function j(n,e,t="additive"){for(let s of Ls)s({scope:n,reason:e,kind:t})}var Ze=require("bun:sqlite"),Ss=require("crypto");var b=require("path"),Ue=require("os"),ce=require("fs"),Et=require("url");var I=require("fs"),st=require("crypto"),v=require("path");var bs=null;function hs(n){return(bs??process.stderr.write.bind(process.stderr))(n)}function W(n){hs(n)}var vr=Promise.resolve();var rt=process.platform==="win32";function De(n){return n.replace(/^\uFEFF/,"")}function Me(n){return JSON.parse(De(n))}function Z(n){return Me((0,I.readFileSync)(n,"utf-8"))}function Ds(n){(0,I.existsSync)(n)||(0,I.mkdirSync)(n,{recursive:!0})}function nt(n){try{return(0,I.realpathSync)(n)}catch(e){if(e.code!=="ENOENT")throw e;let t=(0,v.dirname)(n);return t===n?n:(0,v.join)(nt(t),(0,v.basename)(n))}}function Ms(n){let e=n,t=new Set;try{for(;(0,I.lstatSync)(e).isSymbolicLink();){let s=(0,v.resolve)(e);if(t.has(s))throw Object.assign(new Error(`Symlink loop at ${e}`),{code:"ELOOP"});t.add(s);try{return(0,I.realpathSync)(e)}catch(r){if(r.code!=="ENOENT")throw r;let o=r instanceof Error?r:new Error(String(r));W(`claude-mem: realpathSync failed for ${e}, resolving symlink manually: ${o.message}
`);let i=(0,I.readlinkSync)(e);e=(0,v.resolve)(nt((0,v.dirname)((0,v.resolve)(e))),i)}}}catch(s){if(s.code!=="ENOENT")throw s}return e}var Us=new Set(["EPERM","EBUSY","EACCES"]),tt=[10,20,40,80,160,320];function ys(n){Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,n)}function vs(n,e,t=I.renameSync,s=rt){if(!s)return t(n,e);for(let r=0;;r++)try{t(n,e);return}catch(o){let i=o.code??"";if(r>=tt.length||!Us.has(i))throw o;ys(tt[r])}}function G(n,e,t={}){let s=Ms(n);Ds((0,v.dirname)(s));let r=(0,v.dirname)(s),o=(0,v.basename)(s),i=(0,v.join)(r,`.${o}.${process.pid}.${(0,st.randomBytes)(6).toString("hex")}.tmp`),a=Buffer.from(JSON.stringify(e,null,2)+`
`,"utf-8"),_=t.mode;if(_===void 0)try{_=(0,I.statSync)(s).mode&511}catch{}let E;try{E=_!==void 0?(0,I.openSync)(i,"w",_):(0,I.openSync)(i,"w");let u=0;for(;u<a.length;){let d=(0,I.writeSync)(E,a,u,a.length-u);if(d===0)throw new Error(`writeSync stalled at ${u}/${a.length} bytes`);u+=d}if((0,I.fsyncSync)(E),(0,I.closeSync)(E),E=void 0,vs(i,s),!rt){let d;try{d=(0,I.openSync)(r,"r"),(0,I.fsyncSync)(d)}catch(l){let p=l instanceof Error?l:new Error(String(l));W(`claude-mem: directory fsync failed for ${r}: ${p.message}
`)}finally{if(d!==void 0)try{(0,I.closeSync)(d)}catch{}}}}catch(u){if(E!==void 0)try{(0,I.closeSync)(E)}catch{}try{(0,I.unlinkSync)(i)}catch{}throw u}}var Fs=n=>n!==null&&typeof n=="object"&&!Array.isArray(n);function ot(n){let e=n.env;return Fs(e)&&Object.keys(e).some(t=>t.startsWith("CLAUDE_MEM_"))?"nested":"flat"}function K(n){return ot(n)==="nested"?n.env:n}function it(n){return ot(n)!=="nested"?n:Object.fromEntries(Object.entries(n).filter(([e])=>!e.startsWith("CLAUDE_MEM_")))}var at=require("os"),_t=require("path");function Y(n,e=process.platform,t=(0,at.homedir)()){return typeof n!="string"||n.length===0?n:n==="~"?t:n.startsWith("~/")||e==="win32"&&n.startsWith("~\\")?(0,_t.join)(t,n.slice(2)):n}function Ps(){return typeof __CM_DIRNAME__<"u"?__CM_DIRNAME__:(0,b.dirname)((0,Et.fileURLToPath)(__IMPORT_META_URL__))}var Wr=Ps();function ws(){if(process.env.CLAUDE_MEM_DATA_DIR)return Y(process.env.CLAUDE_MEM_DATA_DIR);let n=(0,b.join)((0,Ue.homedir)(),".claude-mem"),e=(0,b.join)(n,"settings.json");try{if((0,ce.existsSync)(e)){let t=Z(e);if(t===null||typeof t!="object"||Array.isArray(t))return n;let s=K(t);if(typeof s.CLAUDE_MEM_DATA_DIR=="string"&&s.CLAUDE_MEM_DATA_DIR)return Y(s.CLAUDE_MEM_DATA_DIR)}}catch{}return n}var D=ws(),xs=(0,b.join)((0,Ue.homedir)(),".claude"),ks=process.env.CLAUDE_CONFIG_DIR||xs,Kr=(0,b.join)(ks,"plugins","marketplaces","thedotmack"),Bs=(0,b.join)(D,"logs"),le=(0,b.join)(D,"settings.json"),dt="claude-mem.db";var pe=(0,b.join)(D,dt),Gs=(0,b.join)(D,"observer-sessions"),ee=(0,b.basename)(Gs);function me(n){(0,ce.mkdirSync)(n,{recursive:!0})}var ye={dataDir:()=>D,workerPid:()=>(0,b.join)(D,"worker.pid"),workerHeartbeat:()=>(0,b.join)(D,"worker-heartbeat.json"),serverPid:()=>(0,b.join)(D,".server-beta.pid"),serverPort:()=>(0,b.join)(D,".server-beta.port"),serverRuntime:()=>(0,b.join)(D,".server-beta.runtime.json"),settings:()=>(0,b.join)(D,"settings.json"),database:()=>(0,b.join)(D,dt),backups:()=>(0,b.join)(D,"backups","auto"),pendingRestore:()=>(0,b.join)(D,"backups","restore-pending.json"),lastRestore:()=>(0,b.join)(D,"backups","last-restore.json"),chroma:()=>(0,b.join)(D,"chroma"),combinedCerts:()=>(0,b.join)(D,"combined_certs.pem"),transcriptsConfig:()=>(0,b.join)(D,"transcript-watch.json"),transcriptsState:()=>(0,b.join)(D,"transcript-watch-state.json"),corpora:()=>(0,b.join)(D,"corpora"),supervisorRegistry:()=>(0,b.join)(D,"supervisor.json"),envFile:()=>(0,b.join)(D,".env"),logsDir:()=>Bs};var U=require("fs"),Te=require("path");var Fe=(o=>(o[o.DEBUG=0]="DEBUG",o[o.INFO=1]="INFO",o[o.WARN=2]="WARN",o[o.ERROR=3]="ERROR",o[o.SILENT=4]="SILENT",o))(Fe||{}),ve=null,Pe=class{level=null;useColor;logFilePath=null;logFileInitialized=!1;logFileDate=null;logFd=null;constructor(){this.useColor=process.stdout.isTTY??!1}ensureLogFileInitialized(){let e=new Date().toISOString().split("T")[0];if(this.logFileInitialized&&this.logFileDate===e)return;let t=this.logFileDate!==e;this.closeLogFd(),this.logFileInitialized=!1,this.logFileDate=e;try{let s=ye.logsDir();(0,U.existsSync)(s)||(0,U.mkdirSync)(s,{recursive:!0}),this.logFilePath=(0,Te.join)(s,`claude-mem-${e}.log`),this.logFileInitialized=!0}catch(s){t&&console.error("[LOGGER] Failed to initialize log file:",s instanceof Error?s.message:String(s)),this.logFilePath=null}}closeLogFd(){if(this.logFd!==null){try{(0,U.closeSync)(this.logFd)}catch{}this.logFd=null}}appendLine(e,t){if(this.logFd!==null){let s=!1;try{let r=(0,U.fstatSync)(this.logFd),o=(0,U.statSync)(e);s=r.ino===o.ino&&r.dev===o.dev}catch{}s||this.closeLogFd()}this.logFd===null&&((0,U.mkdirSync)((0,Te.dirname)(e),{recursive:!0}),this.logFd=(0,U.openSync)(e,"a"));try{let s=Buffer.from(t,"utf8");for(;s.length>0;){let r=(0,U.writeSync)(this.logFd,s);if(r<=0)throw new Error("log write accepted 0 bytes");s=s.subarray(r)}}catch(s){throw this.closeLogFd(),s}}getLevel(){if(this.level===null)try{let e=ye.settings();if((0,U.existsSync)(e)){let s=(K(Z(e)).CLAUDE_MEM_LOG_LEVEL||"INFO").toString().toUpperCase();this.level=Fe[s]??1}else this.level=1}catch(e){console.error("[LOGGER] Failed to load log level from settings:",e instanceof Error?e.message:String(e)),this.level=1}return this.level}safeStringify(e,t,s=6){let r=new WeakSet,o=(i,a)=>{if(typeof i=="bigint")return`${i}n`;if(i===null||typeof i!="object")return i;let _=i.toJSON,E=typeof _=="function"?_.call(i):i;if(typeof E=="bigint")return`${E}n`;if(E===null||typeof E!="object")return E;if(r.has(E))return"[Circular]";if(a>=s)return Array.isArray(E)?"[Array]":"[Object]";r.add(E);try{if(Array.isArray(E))return E.map(d=>o(d,a+1));let u={};for(let d of Object.keys(E))try{u[d]=o(E[d],a+1)}catch{u[d]="[unreadable]"}return u}finally{r.delete(E)}};try{return JSON.stringify(o(e,0),null,t)??String(e)}catch{return Array.isArray(e)?`[${e.length} items]`:"[unserializable]"}}formatData(e){if(e==null)return"";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return e.toString();if(typeof e=="object"){if(e instanceof Error)return this.getLevel()===0?`${e.message}
${e.stack}`:e.message;if(Array.isArray(e))return`[${e.length} items]`;let t=Object.keys(e);return t.length===0?"{}":t.length<=3?this.safeStringify(e):`{${t.length} keys: ${t.slice(0,3).join(", ")}...}`}return String(e)}formatTool(e,t){if(!t)return e;let s=t;if(typeof t=="string")try{s=JSON.parse(t)}catch{s=t}if(s===null)return e;if(e==="Bash"&&s.command)return`${e}(${s.command})`;if(s.file_path)return`${e}(${s.file_path})`;if(s.notebook_path)return`${e}(${s.notebook_path})`;if(e==="Glob"&&s.pattern)return`${e}(${s.pattern})`;if(e==="Grep"&&s.pattern)return`${e}(${s.pattern})`;if(s.url)return`${e}(${s.url})`;if(s.query)return`${e}(${s.query})`;if(e==="Task"){if(s.subagent_type)return`${e}(${s.subagent_type})`;if(s.description)return`${e}(${s.description})`}return e==="Skill"&&s.skill?`${e}(${s.skill})`:e==="LSP"&&s.operation?`${e}(${s.operation})`:e}formatTimestamp(e){let t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0"),o=String(e.getHours()).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0"),a=String(e.getSeconds()).padStart(2,"0"),_=String(e.getMilliseconds()).padStart(3,"0");return`${t}-${s}-${r} ${o}:${i}:${a}.${_}`}log(e,t,s,r,o){if(e<this.getLevel())return;this.ensureLogFileInitialized();let i=this.formatTimestamp(new Date),a=Fe[e].padEnd(5),_=t.padEnd(6),E="";r?.correlationId?E=`[${r.correlationId}] `:r?.sessionId&&(E=`[session-${r.sessionId}] `);let u="";o!=null&&(o instanceof Error?u=this.getLevel()===0?`
${o.message}
${o.stack}`:` ${o.message}`:this.getLevel()===0&&typeof o=="object"?u=`
`+this.safeStringify(o,2):u=" "+this.formatData(o));let d="";if(r){let{sessionId:p,memorySessionId:A,correlationId:C,...O}=r;Object.keys(O).length>0&&(d=` {${Object.entries(O).map(([g,T])=>typeof T!="object"||T===null||T instanceof Error||T instanceof Date?`${g}=${T}`:`${g}=${Array.isArray(T)?this.safeStringify(T):this.formatData(T)}`).join(", ")}}`)}let l=`[${i}] [${a}] [${_}] ${E}${s}${d}${u}`;if(this.logFilePath)try{this.appendLine(this.logFilePath,l+`
`)}catch(p){let A=p instanceof Error?p:new Error(String(p));W(`[LOGGER] Failed to write to log file: ${A.message}
${A.stack??""}
`)}else W(l+`
`)}debug(e,t,s,r){this.log(0,e,t,s,r)}info(e,t,s,r){this.log(1,e,t,s,r)}warn(e,t,s,r){this.log(2,e,t,s,r)}setErrorSink(e){ve=e}error(e,t,s,r){this.log(3,e,t,s,r),this.routeErrorToSink(t,s,r)}routeErrorToSink(e,t,s){try{if(!ve||!(s instanceof Error))return;ve(s)}catch{}}dataIn(e,t,s,r){this.info(e,`\u2192 ${t}`,s,r)}dataOut(e,t,s,r){this.info(e,`\u2190 ${t}`,s,r)}success(e,t,s,r){this.info(e,`\u2713 ${t}`,s,r)}failure(e,t,s,r){this.error(e,`\u2717 ${t}`,s,r)}},c=new Pe;function P(n){let e=n.projects?.length?n.projects:n.project?[n.project]:[];return[...new Set(e.map(t=>t.trim()).filter(Boolean))]}function x(n,e,t){let s=e.map(()=>"?").join(",");return t.includeMerged?{sql:`(${n}.project COLLATE NOCASE IN (${s}) OR ${n}.merged_into_project COLLATE NOCASE IN (${s}))`,params:[...e,...e]}:{sql:`${n}.project COLLATE NOCASE IN (${s})`,params:[...e]}}var Hs=4;function ut(n,e){let t=P({projects:e});if(t.length===0)return[];let s=t.map(()=>"?").join(","),r=[[`SELECT project AS key FROM sdk_sessions WHERE project COLLATE NOCASE IN (${s})`,1],[`SELECT project FROM observations WHERE project COLLATE NOCASE IN (${s})`,1],[`SELECT merged_into_project FROM observations WHERE merged_into_project COLLATE NOCASE IN (${s})`,1],[`SELECT project FROM session_summaries WHERE project COLLATE NOCASE IN (${s})`,1],[`SELECT merged_into_project FROM session_summaries WHERE merged_into_project COLLATE NOCASE IN (${s})`,1],[`SELECT candidates.key FROM (
        SELECT project AS key FROM observations WHERE merged_into_project COLLATE NOCASE IN (${s})
        UNION
        SELECT project AS key FROM session_summaries WHERE merged_into_project COLLATE NOCASE IN (${s})
      ) candidates
      WHERE (
        (SELECT COUNT(*) FROM observations WHERE project COLLATE NOCASE = candidates.key)
        + (SELECT COUNT(*) FROM session_summaries WHERE project COLLATE NOCASE = candidates.key)
      ) = (
        (SELECT COUNT(*) FROM observations
          WHERE project COLLATE NOCASE = candidates.key AND merged_into_project COLLATE NOCASE IN (${s}))
        + (SELECT COUNT(*) FROM session_summaries
          WHERE project COLLATE NOCASE = candidates.key AND merged_into_project COLLATE NOCASE IN (${s}))
      )`,Hs]],o=n.prepare(r.map(([i])=>i).join(" UNION "));try{let i=o.all(...r.flatMap(([,a])=>Array(a).fill(t).flat()));return[...new Set([...t,...i.map(a=>a.key)])]}finally{o.finalize()}}var ct=require("crypto");function we(n){return typeof n=="string"&&n.trim()!==""}function lt(n,e,t){return(0,ct.createHash)("sha256").update([n||"",e||"",t||""].join("\0")).digest("hex").slice(0,16)}function pt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}catch{return[]}}function mt(n,e,t,s){n.prepare("DELETE FROM observation_files WHERE observation_id = ?").run(e);let r=new Set([...pt(t),...pt(s)]);if(r.size===0)return;let o=n.prepare("INSERT OR IGNORE INTO observation_files(path, observation_id) VALUES (?, ?)");for(let i of r)o.run(i,e)}function Tt(n){if(!n)return[];try{let e=JSON.parse(n);return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}catch{return[]}}function xe(n=new Date){return n.toISOString().slice(0,10)}function St(n,e=new Date,t=10){let s=xe(e);if(n.includes(s))return n;let r=[...n,s];return r.length>t?r.slice(r.length-t):r}function At(n){let e=xe(new Date(n));return{dates:JSON.stringify([e]),lastReinforced:e}}function Se(n,e,t=new Date){let s=n.prepare("SELECT reinforcement_dates FROM observations WHERE id = ?").get(e);if(!s)return!1;let r=Tt(s.reinforcement_dates),o=St(r,t);return o===r?!1:(n.prepare("UPDATE observations SET reinforcement_dates = ?, last_reinforced = ? WHERE id = ?").run(JSON.stringify(o),o[o.length-1],e),!0)}var gt=require("crypto");var S="claude";function Xs(n){return n.trim().toLowerCase().replace(/\s+/g,"-")}function N(n){if(!n)return S;let e=Xs(n);return e?e==="transcript"||e.includes("codex")?"codex":e.includes("cursor")?"cursor":e.includes("claude")?"claude":e.includes("kimi")?"kimi":e==="pi-mono"?"pi":e==="agy"||e==="antigravity"||e.startsWith("antigravity-")?"antigravity-cli":e:S}function Rt(n){let e=["claude","codex","antigravity-cli","cursor","kimi"];return[...n].sort((t,s)=>{let r=e.indexOf(t),o=e.indexOf(s);return r!==-1||o!==-1?r===-1?1:o===-1?-1:r-o:t.localeCompare(s)})}var $s=new Set(["dumb_search","claude_mem_search","claude_mem_timeline","claude_mem_get_observations","mem_search","search","timeline","get_observations","get_summaries","get_tool_uses","session_start_context","observation_search","observation_context","memory_search","memory_context"]);function js(n){if(!n.startsWith("mcp__"))return null;let e=n.split("__");if(e.length<3)return null;let t=e[1].toLowerCase();return!t.includes("claude-mem")&&!t.includes("claude_mem")&&!t.includes("mcp-search")&&!t.includes("mcp_search")&&!t.includes("cmem")?null:e.slice(2).join("__")}function ke(n){if(!n)return!1;if(n.startsWith("memory_")||n==="claude_mem_search"||n==="claude_mem_timeline"||n==="claude_mem_get_observations"||n==="dumb_search"||n==="mem_search"||n==="get_summaries")return!0;let e=js(n);return e!==null&&$s.has(e)}var Ws=64*1024;function Ot(n,e=Ws){let t=Buffer.byteLength(n,"utf8");if(t<=e)return n;let s=Buffer.from(n,"utf8"),r=e;for(;r>0&&(s[r]&192)===128;)r--;return`${s.subarray(0,r).toString("utf8")}\u2026[truncated: ${t} bytes]`}function Ks(n,e,t){return(0,gt.createHash)("sha256").update([n||"",e||"",t||""].join("\0")).digest("hex").slice(0,16)}function Nt(n){n.run(`
    CREATE TABLE IF NOT EXISTS tool_uses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tool_use_id TEXT NOT NULL,
      content_session_id TEXT NOT NULL,
      memory_session_id TEXT,
      session_db_id INTEGER,
      project TEXT NOT NULL,
      platform_source TEXT NOT NULL DEFAULT '${S}',
      tool_name TEXT NOT NULL,
      tool_input TEXT,
      tool_response TEXT,
      cwd TEXT,
      prompt_number INTEGER,
      agent_type TEXT,
      agent_id TEXT,
      observation_id INTEGER,
      or_generation_id TEXT,
      or_session_id TEXT,
      content_hash TEXT,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL,
      UNIQUE(content_session_id, tool_use_id)
    )
  `),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_project ON tool_uses(project)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_project_nocase_created ON tool_uses(project COLLATE NOCASE, created_at_epoch DESC, id DESC)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_memory_session ON tool_uses(memory_session_id)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_content_session ON tool_uses(content_session_id)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_session_db_id ON tool_uses(session_db_id)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_tool_name ON tool_uses(tool_name)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_created_at_epoch ON tool_uses(created_at_epoch)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_observation_id ON tool_uses(observation_id)"),n.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_or_generation_id ON tool_uses(or_generation_id)")}function ft(n,e){if(!e.toolUseId||!e.contentSessionId||!e.toolName||ke(e.toolName))return null;let t=e.createdAtEpoch??Date.now(),s=new Date(t).toISOString(),r=Ks(e.toolName,e.toolInput,e.toolResponse),o=e.toolInput!=null?Ot(e.toolInput):null,i=e.toolResponse!=null?Ot(e.toolResponse):null,a=n.prepare(`
    INSERT INTO tool_uses (
      tool_use_id, content_session_id, memory_session_id, session_db_id, project,
      platform_source, tool_name, tool_input, tool_response, cwd, prompt_number,
      agent_type, agent_id, or_generation_id, or_session_id, content_hash,
      created_at, created_at_epoch
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(content_session_id, tool_use_id) DO UPDATE SET
      memory_session_id = CASE WHEN tool_uses.observation_id IS NULL
        THEN COALESCE(excluded.memory_session_id, tool_uses.memory_session_id)
        ELSE tool_uses.memory_session_id END,
      session_db_id     = COALESCE(excluded.session_db_id, tool_uses.session_db_id),
      project           = CASE WHEN excluded.project != '' THEN excluded.project ELSE tool_uses.project END,
      platform_source   = excluded.platform_source,
      tool_input        = COALESCE(excluded.tool_input, tool_uses.tool_input),
      tool_response     = COALESCE(excluded.tool_response, tool_uses.tool_response),
      cwd               = COALESCE(excluded.cwd, tool_uses.cwd),
      prompt_number     = COALESCE(excluded.prompt_number, tool_uses.prompt_number),
      agent_type        = COALESCE(excluded.agent_type, tool_uses.agent_type),
      agent_id          = COALESCE(excluded.agent_id, tool_uses.agent_id),
      or_generation_id  = COALESCE(excluded.or_generation_id, tool_uses.or_generation_id),
      or_session_id     = COALESCE(excluded.or_session_id, tool_uses.or_session_id),
      content_hash      = excluded.content_hash
    RETURNING id
  `).get(e.toolUseId,e.contentSessionId,e.memorySessionId??null,e.sessionDbId??null,e.project??"",N(e.platformSource),e.toolName,o,i,e.cwd??null,e.promptNumber??null,e.agentType??null,e.agentId??null,e.orGenerationId??null,e.orSessionId??null,r,s,t);return a?a.id:null}function Ct(n,e){let t=e.toolUseIds.filter(o=>typeof o=="string"&&o.length>0);if(t.length===0)return 0;let s=t.map(()=>"?").join(","),r=n.prepare(`
    UPDATE tool_uses
    SET observation_id = COALESCE(observation_id, ?),
        memory_session_id = CASE WHEN observation_id IS NULL
          THEN COALESCE(?, memory_session_id)
          ELSE COALESCE(memory_session_id, ?)
        END
    WHERE content_session_id = ?
      AND tool_use_id IN (${s})
      AND (observation_id IS NULL OR observation_id = ?)
  `).run(e.observationId,e.memorySessionId??null,e.memorySessionId??null,e.contentSessionId,...t,e.observationId);return Number(r.changes??0)}function It(n){return n?{clause:`COALESCE(NULLIF(platform_source, ''), '${S}') = ?`,param:N(n)}:null}function Lt(n,e,t={}){let s=[],r=[];for(let u of e){if(typeof u=="number"&&Number.isInteger(u)){s.push(u);continue}if(typeof u=="string"&&u.trim().length>0){let d=Number(u);Number.isInteger(d)&&String(d)===u.trim()&&s.push(d),r.push(u.trim())}}if(s.length===0&&r.length===0)return[];let o=[],i=[];s.length>0&&(o.push(`id IN (${s.map(()=>"?").join(",")})`),i.push(...s)),r.length>0&&(o.push(`tool_use_id IN (${r.map(()=>"?").join(",")})`),i.push(...r));let a=[`(${o.join(" OR ")})`];t.project&&(a.push("project COLLATE NOCASE = ?"),i.push(t.project)),t.contentSessionId&&(a.push("content_session_id = ?"),i.push(t.contentSessionId));let _=It(t.platformSource);_&&(a.push(_.clause),i.push(_.param));let E=t.limit&&t.limit>0?`LIMIT ${Math.floor(t.limit)}`:"";return n.prepare(`
    SELECT * FROM tool_uses
    WHERE ${a.join(" AND ")}
    ORDER BY created_at_epoch DESC
    ${E}
  `).all(...i)}function bt(n,e={}){let t=[],s=[];if(e.project&&(t.push("project COLLATE NOCASE = ?"),s.push(e.project)),e.contentSessionId&&(t.push("content_session_id = ?"),s.push(e.contentSessionId)),e.memorySessionId&&(t.push("memory_session_id = ?"),s.push(e.memorySessionId)),typeof e.sessionDbId=="number"&&(t.push("session_db_id = ?"),s.push(e.sessionDbId)),e.toolName){let E=Array.isArray(e.toolName)?e.toolName:[e.toolName];E.length>0&&(t.push(`tool_name IN (${E.map(()=>"?").join(",")})`),s.push(...E))}e.agentId&&(t.push("agent_id = ?"),s.push(e.agentId));let r=It(e.platformSource);r&&(t.push(r.clause),s.push(r.param)),typeof e.dateStart=="number"&&(t.push("created_at_epoch >= ?"),s.push(e.dateStart)),typeof e.dateEnd=="number"&&(t.push("created_at_epoch <= ?"),s.push(e.dateEnd));let o=t.length>0?`WHERE ${t.join(" AND ")}`:"",i=e.orderBy==="date_asc"?"ASC":"DESC",a=Math.min(Math.max(Math.floor(e.limit??50),1),500),_=Math.max(Math.floor(e.offset??0),0);return n.prepare(`
    SELECT * FROM tool_uses
    ${o}
    ORDER BY created_at_epoch ${i}, id ${i}
    LIMIT ${a} OFFSET ${_}
  `).all(...s)}function ht(n,e={}){let t=[],s=[];e.project&&(t.push("project COLLATE NOCASE = ?"),s.push(e.project)),e.contentSessionId&&(t.push("content_session_id = ?"),s.push(e.contentSessionId)),e.agentId&&(t.push("agent_id = ?"),s.push(e.agentId)),typeof e.dateStart=="number"&&(t.push("created_at_epoch >= ?"),s.push(e.dateStart)),typeof e.dateEnd=="number"&&(t.push("created_at_epoch <= ?"),s.push(e.dateEnd));let r=t.length>0?`WHERE ${t.join(" AND ")}`:"";return n.prepare(`
    SELECT tool_name, COUNT(DISTINCT tool_use_id) AS uses
    FROM tool_uses
    ${r}
    GROUP BY tool_name
    ORDER BY uses DESC, tool_name ASC
  `).all(...s)}function Dt(n,e){let t=o=>o.replace(/[A-Z]/g,i=>i.toLowerCase()),s=new Set(e.map(t)),r=e.at(-1);return n.map(o=>r&&s.has(t(o.project))?{...o,scope_project:r}:o)}function Mt(n){n.run(`
    CREATE TABLE IF NOT EXISTS work_state_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project TEXT NOT NULL,
      list_name TEXT NOT NULL,
      fields TEXT NOT NULL,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL
    )
  `),n.run("CREATE INDEX IF NOT EXISTS idx_work_state_entries_project ON work_state_entries(project COLLATE NOCASE, list_name, id)")}function Ut(n,e){let t=e.createdAtEpoch??Date.now(),s=n.prepare(`
    INSERT INTO work_state_entries (project, list_name, fields, created_at, created_at_epoch)
    VALUES (?, ?, ?, ?, ?)
  `).run(e.project,e.listName,JSON.stringify(e.fields),new Date(t).toISOString(),t),r=Number(s.lastInsertRowid);return c.debug("DB","Work state entry appended",{id:r,project:e.project,listName:e.listName}),r}function yt(n,e,t){if(e.length===0)return[];let s=e.map(()=>"?").join(", "),r=t===void 0?"":" AND list_name = ?",o=n.prepare(`
    SELECT id, project, list_name, fields, created_at_epoch
    FROM work_state_entries
    WHERE project COLLATE NOCASE IN (${s})${r}
    ORDER BY id
  `);try{return o.all(...e,...t===void 0?[]:[t]).map(a=>({...a,fields:JSON.parse(a.fields)}))}finally{o.finalize()}}var H=require("fs"),k=require("path"),Ge=require("os");var Ae={HEALTH_CHECK:3e3,API_REQUEST:3e4,SESSION_INIT_HOOK_CAP:15e3,SESSION_INIT_REQUEST:1e4,SESSION_INIT_REQUEST_MAX:14e3,HOOK_READINESS_WAIT:1e4,POST_SPAWN_WAIT:15e3,READINESS_WAIT:3e4,PORT_IN_USE_WAIT:3e3,POWERSHELL_COMMAND:1e4,WINDOWS_MULTIPLIER:1.5};function Ys(n=process.platform){return n==="win32"?8e3:5e3}function vt(n=process.platform){return Ae.SESSION_INIT_HOOK_CAP-Ys(n)}function Ft(n){return process.platform==="win32"?Math.round(n*Ae.WINDOWS_MULTIPLIER):n}function Pt(n){try{return new URL(n).hostname.toLowerCase()==="openrouter.ai"}catch{return!1}}var Vs="security_alert",qs=new Set(["xiaomi/mimo-v2-flash:free"]);function Js(n){return typeof n=="boolean"?String(n):n}function zs(n){let e=n.CLAUDE_MEM_OPENROUTER_MODEL;if(typeof e!="string"||!qs.has(e.trim()))return!1;let t=typeof n.CLAUDE_MEM_OPENROUTER_BASE_URL=="string"?n.CLAUDE_MEM_OPENROUTER_BASE_URL.trim():"";return t===""||Pt(t)}var wt=18e4,xt=[{key:"CLAUDE_MEM_LLM_TIMEOUT_MS",legacy:"30000",markerTag:"llm-timeout-migrated-v1"},{key:"CLAUDE_MEM_FIELD_OPTIMIZE_TIMEOUT_MS",legacy:"30000",markerTag:"field-optimize-timeout-migrated-v1"}];function Bt(n,e){return(0,k.join)((0,k.dirname)(n),`.${(0,k.basename)(n)}.${e.markerTag}`)}function Be(n,e){try{(0,H.writeFileSync)(Bt(n,e),new Date().toISOString(),{encoding:"utf-8",mode:384})}catch{}}var kt=new Set,V=class{static DEFAULTS={CLAUDE_MEM_MEMORY_SEARCH_HOOK_ENABLED:"true",CLAUDE_MEM_MEMORY_INSTRUCTIONS_ENABLED:"true",CLAUDE_MEM_MEMORY_WATCH_ROOTS:"",CLAUDE_MEM_MODEL:"claude-haiku-4-5-20251001",CLAUDE_MEM_CONTEXT_OBSERVATIONS:"25",CLAUDE_MEM_SESSION_START_INCLUDE_ALL_SOURCES:"false",CLAUDE_MEM_CONTEXT_PROJECTS:"current",CLAUDE_MEM_WORKER_PORT:String(37700+(process.getuid?.()??77)%100),CLAUDE_MEM_WORKER_HOST:"127.0.0.1",CLAUDE_MEM_WORKER_INGEST_TOKEN:"",CLAUDE_MEM_WORKER_INGEST_MAX_BYTES:"5242880",CLAUDE_MEM_HOOK_SPOOL_TRANSPORT:"auto",CLAUDE_MEM_ALLOWED_ORIGINS:"",CLAUDE_MEM_PUBLIC_URL:"",CLAUDE_MEM_API_TIMEOUT_MS:String(Ft(Ae.API_REQUEST)),CLAUDE_MEM_SESSION_INIT_TIMEOUT_MS:String(vt()),CLAUDE_MEM_IDLE_EXIT_SEC:"0",CLAUDE_MEM_SKIP_TOOLS:"ListMcpResourcesTool,SlashCommand,Skill,TodoWrite,AskUserQuestion",CLAUDE_MEM_SKIP_BASH_PATTERNS:"",CLAUDE_MEM_SKIP_SUBAGENT_OBSERVATIONS:"false",CLAUDE_MEM_SKIP_AGENT_TYPES:"",CLAUDE_MEM_CAPTURE_ADVISOR_CALLS:"false",CLAUDE_MEM_PROVIDER:"claude",CLAUDE_MEM_CODEX_MODEL:"",CLAUDE_MEM_CODEX_PATH:"codex",CLAUDE_MEM_CODEX_REASONING_EFFORT:"low",CLAUDE_MEM_CODEX_MAX_CONCURRENT_AGENTS:"2",CLAUDE_MEM_CODEX_OBSERVATION_BATCH_SIZE:"8",CLAUDE_MEM_CODEX_OBSERVATION_BATCH_MAX_CHARS:"32000",CLAUDE_MEM_CLAUDE_OBSERVATION_BATCH_SIZE:"1",CLAUDE_MEM_CLAUDE_AUTH_METHOD:"subscription",CLAUDE_MEM_GEMINI_API_KEY:"",CLAUDE_MEM_GEMINI_API_KEYS:"",CLAUDE_MEM_GEMINI_MODEL:"gemini-flash-latest",CLAUDE_MEM_GEMINI_RATE_LIMITING_ENABLED:"true",CLAUDE_MEM_OPENROUTER_API_KEY:"",CLAUDE_MEM_OPENROUTER_API_KEYS:"",CLAUDE_MEM_OPENROUTER_MODEL:"cohere/north-mini-code:free",CLAUDE_MEM_OPENROUTER_BASE_URL:"",CLAUDE_MEM_OPENROUTER_TEMPERATURE:"",CLAUDE_MEM_OPENROUTER_SITE_URL:"",CLAUDE_MEM_OPENROUTER_APP_NAME:"claude-mem",CLAUDE_MEM_OPENROUTER_EXTRA_BODY:"",CLAUDE_MEM_OPENROUTER_REASONING_EFFORT:"",CLAUDE_MEM_OPENAI_COMPAT_PRESET:"",CLAUDE_MEM_OPENAI_COMPAT_API_KEY:"",CLAUDE_MEM_OPENAI_COMPAT_API_KEYS:"",CLAUDE_MEM_OPENAI_COMPAT_BASE_URL:"",CLAUDE_MEM_OPENAI_COMPAT_MODEL:"",CLAUDE_MEM_OPENAI_COMPAT_REASONING:"",CLAUDE_MEM_QUOTA_FALLBACK_PROVIDER:"claude",CLAUDE_MEM_QUOTA_FALLBACK_MODEL:"",CLAUDE_MEM_QUOTA_FALLBACK_AUTH_METHOD:"",CLAUDE_MEM_QUOTA_THRESHOLD_FIVE_HOUR:"0.95",CLAUDE_MEM_QUOTA_THRESHOLD_SEVEN_DAY:"0.93",CLAUDE_MEM_QUOTA_THRESHOLD_SEVEN_DAY_OPUS:"0.93",CLAUDE_MEM_QUOTA_THRESHOLD_SEVEN_DAY_SONNET:"0.92",CLAUDE_MEM_QUOTA_THRESHOLD_OVERAGE:"0.95",CLAUDE_MEM_DATA_DIR:(0,k.join)((0,Ge.homedir)(),".claude-mem"),CLAUDE_MEM_LOG_LEVEL:"INFO",CLAUDE_MEM_PYTHON_VERSION:"3.13",CLAUDE_CODE_PATH:"",CLAUDE_MEM_CLAUDE_CONFIG_DIR:"",CLAUDE_MEM_OBSERVER_CLAUDE_CONFIG_DIR:"",CLAUDE_MEM_MODE:"code",CLAUDE_MEM_CONTEXT_SHOW_READ_TOKENS:"false",CLAUDE_MEM_CONTEXT_SHOW_WORK_TOKENS:"false",CLAUDE_MEM_CONTEXT_OBSERVATION_TYPES:"",CLAUDE_MEM_CONTEXT_OBSERVATION_CONCEPTS:"",CLAUDE_MEM_CONTEXT_FULL_COUNT:"0",CLAUDE_MEM_CONTEXT_FULL_FIELD:"narrative",CLAUDE_MEM_CONTEXT_SESSION_COUNT:"5",CLAUDE_MEM_CONTEXT_SHOW_LAST_SUMMARY:"true",CLAUDE_MEM_CONTEXT_SHOW_LAST_MESSAGE:"false",CLAUDE_MEM_CONTEXT_MAIN_AGENT_ONLY:"true",CLAUDE_MEM_REINFORCE_ALPHA:"0",CLAUDE_MEM_CONTEXT_SHOW_TERMINAL_OUTPUT:"true",CLAUDE_MEM_WELCOME_HINT_ENABLED:"false",CLAUDE_MEM_WORK_STATE_ENABLED:"true",CLAUDE_MEM_FILE_READ_GATE_ENABLED:"true",CLAUDE_MEM_FOLDER_CLAUDEMD_ENABLED:"false",CLAUDE_MEM_FOLDER_USE_LOCAL_MD:"false",CLAUDE_MEM_TRANSCRIPTS_ENABLED:"true",CLAUDE_MEM_TRANSCRIPTS_CONFIG_PATH:(0,k.join)((0,Ge.homedir)(),".claude-mem","transcript-watch.json"),CLAUDE_MEM_CODEX_TRANSCRIPT_INGESTION:"false",CLAUDE_MEM_CODEX_SUBAGENT_INGESTION:"false",CLAUDE_MEM_MAX_CONCURRENT_AGENTS:"2",CLAUDE_MEM_OBSERVER_MAX_CONVERSATION_CHARS:"400000",CLAUDE_MEM_OBSERVER_THINKING:"disabled",CLAUDE_MEM_OBSERVER_CONTEXT_WINDOW:"",CLAUDE_MEM_OBSERVER_MAX_OUTPUT_TOKENS:"4096",CLAUDE_MEM_OBSERVE_BARE_PROMPTS:"false",CLAUDE_MEM_HOOK_FAIL_LOUD_THRESHOLD:"3",CLAUDE_MEM_REDACT_ENABLED:"false",CLAUDE_MEM_REDACT_DISABLED_BUILTINS:"",CLAUDE_MEM_REDACT_CUSTOM_PATTERNS:"[]",CLAUDE_MEM_REDACT_LOG_MATCHES:"false",CLAUDE_MEM_REDACT_GENERIC_ENABLED:"false",CLAUDE_MEM_EXCLUDED_PROJECTS:"",CLAUDE_MEM_PROJECT_ENVIRONMENTS:"[]",CLAUDE_MEM_FOLDER_MD_EXCLUDE:"[]",CLAUDE_MEM_FOLDER_MD_SKELETON_DENYLIST:"[]",CLAUDE_MEM_SEMANTIC_INJECT:"false",CLAUDE_MEM_SEMANTIC_INJECT_LIMIT:"5",CLAUDE_MEM_SEMANTIC_INJECT_FORMAT:"narrative",CLAUDE_MEM_TIER_ROUTING_ENABLED:"true",CLAUDE_MEM_TIER_SIMPLE_MODEL:"haiku",CLAUDE_MEM_TIER_SUMMARY_MODEL:"",CLAUDE_MEM_TIER_FAST_MODEL:"haiku",CLAUDE_MEM_TIER_SMART_MODEL:"sonnet",CLAUDE_MEM_CHROMA_ENABLED:"true",CLAUDE_MEM_CHROMA_MODE:"local",CLAUDE_MEM_CHROMA_HOST:"127.0.0.1",CLAUDE_MEM_CHROMA_PORT:"8000",CLAUDE_MEM_CHROMA_SSL:"false",CLAUDE_MEM_CHROMA_API_KEY:"",CLAUDE_MEM_CHROMA_TENANT:"default_tenant",CLAUDE_MEM_CHROMA_DATABASE:"default_database",CLAUDE_MEM_CHROMA_PREWARM_TIMEOUT_MS:"120000",CLAUDE_MEM_CHROMA_MUTATION_TIMEOUT_MS:"600000",CLAUDE_MEM_CHROMA_MAX_PENDING_MUTATIONS:"5000",CLAUDE_MEM_CHROMA_EMBEDDING_FUNCTION:"default",CLAUDE_MEM_SERVER_VECTOR_SEARCH:"auto",CLAUDE_MEM_EMBEDDING_BACKFILL_THREADS:"",CLAUDE_MEM_EMBEDDING_MODEL:"all-MiniLM-L6-v2",CLAUDE_MEM_CHROMA_UVX_PATH:"",CLAUDE_MEM_SEARCH_RECENCY_DAYS:"90",CLAUDE_MEM_LLM_TIMEOUT_MS:String(wt),CLAUDE_MEM_FIELD_OPTIMIZE_TIMEOUT_MS:String(wt),CLAUDE_MEM_LLM_STREAM_IDLE_TIMEOUT_MS:"90000",CLAUDE_MEM_WORKER_HEARTBEAT_STALE_MS:"120000",CLAUDE_MEM_TV_TOKEN:"",CLAUDE_MEM_PRO_TRIAL_EMAIL:"",CLAUDE_MEM_PRO_TRIAL_AT:"",CLAUDE_MEM_PRO_TRIAL_STATE:"",CLAUDE_MEM_PRO_TRIAL_ENDS_AT:"",CLAUDE_MEM_PRO_PLAN:"",CLAUDE_MEM_PRO_FALLBACK_AT:"",CLAUDE_MEM_PRO_FALLBACK_MESSAGE:"",CLAUDE_MEM_PRO_FALLBACK_ACTION:"",CLAUDE_MEM_PRO_FALLBACK_URL:"",CLAUDE_MEM_PRO_MEMORY_KEY:"",CLAUDE_MEM_PRO_MEMORY_BASE_URL:"",CLAUDE_MEM_PRO_MEMORY_MODEL:"",CLAUDE_MEM_BACKUP_ENABLED:"false",CLAUDE_MEM_BACKUP_INTERVAL_HOURS:"24",CLAUDE_MEM_BACKUP_RETAIN_COUNT:"7",CLAUDE_MEM_TELEGRAM_ENABLED:"true",CLAUDE_MEM_TELEGRAM_BOT_TOKEN:"",CLAUDE_MEM_TELEGRAM_CHAT_ID:"",CLAUDE_MEM_TELEGRAM_WRAPUPS_ENABLED:"true",CLAUDE_MEM_TELEGRAM_OBSERVATION_ALERTS_ENABLED:"false",CLAUDE_MEM_TELEGRAM_WRAPUP_ROUTES:"{}",CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES:"security_alert,sensitive",CLAUDE_MEM_TELEGRAM_TRIGGER_CONCEPTS:"",CLAUDE_MEM_GROK_BOT_AWARENESS_ENABLED:"true",CLAUDE_MEM_GROK_BOT_AWARENESS_AGENT_IDS:"521e962d-2ec3-4488-bfbc-54d5209ce118,95601360-61f7-4fd9-bb3a-2c976b2b85c0",CLAUDE_MEM_GROK_BOT_AWARENESS_TRIGGER_TYPES:"decision,bugfix,security_alert,sensitive",CLAUDE_MEM_GROK_BOT_AWARENESS_TRIGGER_CONCEPTS:"",CLAUDE_MEM_GROK_BOT_WEBHOOK_URL:"",CLAUDE_MEM_GROK_BOT_WEBHOOK_SECRET:"",CLAUDE_MEM_NOTION_ENABLED:"false",CLAUDE_MEM_NOTION_TOKEN:"",CLAUDE_MEM_NOTION_DATABASE_ID:"",CLAUDE_MEM_NOTION_AUTO_CREATE_PROPERTIES:"true",CLAUDE_MEM_GROK_BOT_INJECT_ENABLED:"true",CLAUDE_MEM_GROK_BOT_INJECT_AGENT_IDS:"*",CLAUDE_MEM_GROK_BOT_INJECT_TIER:"episode",CLAUDE_MEM_GROK_BOT_INJECT_WINDOW:"80",CLAUDE_MEM_GROK_BOT_INJECT_FALLBACK:"house",CLAUDE_MEM_GROK_BOT_INJECT_PLATFORM_SOURCE:"",CLAUDE_MEM_GROK_BOT_INJECT_PROJECTS_BY_AGENT:"",CLAUDE_MEM_GROK_BOT_INJECT_MAX_LINE_CHARS:"160",CLAUDE_MEM_GROK_BOT_INJECT_DEBOUNCE_MS:"1500",CLAUDE_MEM_GROK_BOT_INJECT_STANDING_LINE:"",CLAUDE_MEM_CCS_ALIGN_ENABLED:"true",CLAUDE_MEM_CCS_ALIGN_VIEWER_IDS:"ccs-align",CLAUDE_MEM_CCS_ALIGN_TRIGGER_TYPES:"decision,bugfix,security_alert,sensitive",CLAUDE_MEM_CCS_ALIGN_PATCH_SHADOWS:"false",CLAUDE_MEM_QUEUE_ENGINE:"sqlite",CLAUDE_MEM_REDIS_URL:"",CLAUDE_MEM_REDIS_HOST:"127.0.0.1",CLAUDE_MEM_REDIS_PORT:"6379",CLAUDE_MEM_REDIS_MODE:"external",CLAUDE_MEM_QUEUE_REDIS_PREFIX:`claude_mem_${process.env.CLAUDE_MEM_WORKER_PORT??String(37700+(process.getuid?.()??77)%100)}`,CLAUDE_MEM_AUTH_MODE:"api-key",CLAUDE_MEM_RUNTIME:"worker",CLAUDE_MEM_SERVER_URL:`http://127.0.0.1:${process.env.CLAUDE_MEM_SERVER_PORT??String(37877+(process.getuid?.()??77)%100)}`,CLAUDE_MEM_SERVER_API_KEY:"",CLAUDE_MEM_SERVER_PROJECT_ID:"",CLAUDE_MEM_SERVER_BETA_URL:`http://127.0.0.1:${process.env.CLAUDE_MEM_SERVER_PORT??String(37877+(process.getuid?.()??77)%100)}`,CLAUDE_MEM_SERVER_BETA_API_KEY:"",CLAUDE_MEM_SERVER_BETA_PROJECT_ID:"",CLAUDE_MEM_DEDUP_ENABLED:"false",CLAUDE_MEM_DEDUP_COSINE_THRESHOLD:"0.80",CLAUDE_MEM_DEDUP_IDF_VETO_DF:"10",CLAUDE_MEM_DEDUP_MIN_SHARED_TOKENS:"2",CLAUDE_MEM_DEDUP_MIN_PROJECT_DOCS:"10",CLAUDE_MEM_DEDUP_MAX_SCAN:"2000",CLAUDE_MEM_DEDUP_MAX_BACKFILL_ROWS:"50000",CLAUDE_MEM_TOOL_USES_RETENTION_DAYS:"0",CLAUDE_MEM_WORKER_AUTOSTART:"true",CLAUDE_MEM_PROJECT_NAME_SOURCE:"path"};static getAllDefaults(){return{...this.DEFAULTS}}static get(e){let t=process.env[e]??this.DEFAULTS[e];return e==="CLAUDE_MEM_WORKER_HOST"?this.normalizeWorkerHost(t):t}static normalizeWorkerHost(e){return e==="localhost"?"127.0.0.1":e}static finalizeSettings(e,t){let s=t?this.applyEnvOverrides(e):e;s.CLAUDE_MEM_WORKER_HOST=this.normalizeWorkerHost(s.CLAUDE_MEM_WORKER_HOST);let r=s.CLAUDE_MEM_DATA_DIR?.trim();return r&&s.CLAUDE_MEM_TRANSCRIPTS_CONFIG_PATH===this.DEFAULTS.CLAUDE_MEM_TRANSCRIPTS_CONFIG_PATH&&(s.CLAUDE_MEM_TRANSCRIPTS_CONFIG_PATH=(0,k.join)(Y(r),"transcript-watch.json")),s}static getInt(e){let t=this.get(e);return parseInt(t,10)}static applyEnvOverrides(e){let t={...e};for(let s of Object.keys(this.DEFAULTS))process.env[s]!==void 0&&(t[s]=process.env[s]);return t}static loadFromFile(e,t=!0,s={}){try{if(!(0,H.existsSync)(e)){let d=this.getAllDefaults();if(!s.readOnly)try{G(e,d,{mode:384});for(let l of xt)Be(e,l);console.warn("[SETTINGS] Created settings file with defaults:",e)}catch(l){console.warn("[SETTINGS] Failed to create settings file, using in-memory defaults:",e,l instanceof Error?l.message:String(l))}return this.finalizeSettings(d,t)}let r=(0,H.readFileSync)(e,"utf-8"),o=Me(r),i=K(o),a=i!==o,_=it(o),E=a&&Object.keys(_).some(d=>d!=="env");if(a&&!E&&!s.readOnly)try{G(e,i,{mode:384}),console.warn("[SETTINGS] Migrated settings file from nested to flat schema:",e)}catch(d){console.warn("[SETTINGS] Failed to auto-migrate settings file:",e,d instanceof Error?d.message:String(d))}if(i.CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES===Vs&&(i={...i,CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES:this.DEFAULTS.CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES},!s.readOnly))try{G(e,E?{..._,env:i}:i,{mode:384}),console.warn("[SETTINGS] Migrated Telegram trigger types off the legacy default:",e)}catch(d){console.warn("[SETTINGS] Failed to migrate Telegram trigger types:",e,d instanceof Error?d.message:String(d))}if(zs(i)){let d=String(i.CLAUDE_MEM_OPENROUTER_MODEL).trim();if(i={...i,CLAUDE_MEM_OPENROUTER_MODEL:this.DEFAULTS.CLAUDE_MEM_OPENROUTER_MODEL},!s.readOnly)try{G(e,E?{..._,env:i}:i,{mode:384}),console.warn(`[SETTINGS] Migrated OpenRouter model off the retired default ${d} to ${this.DEFAULTS.CLAUDE_MEM_OPENROUTER_MODEL}:`,e)}catch(l){console.warn("[SETTINGS] Failed to migrate the retired OpenRouter model:",e,l instanceof Error?l.message:String(l))}}for(let d of xt)if(!(0,H.existsSync)(Bt(e,d))){if(i[d.key]!==d.legacy){s.readOnly||Be(e,d);continue}if(i={...i,[d.key]:this.DEFAULTS[d.key]},!s.readOnly)try{G(e,E?{..._,env:i}:i,{mode:384}),Be(e,d),console.warn(`[SETTINGS] Migrated ${d.key} off the old ${d.legacy}ms default to ${this.DEFAULTS[d.key]}ms:`,e)}catch(l){let p=`${d.key}\0${e}`;kt.has(p)||(kt.add(p),console.warn(`[SETTINGS] Failed to migrate ${d.key}; using the new default in memory (reported once per process):`,e,l instanceof Error?l.message:String(l)))}}let u={...this.DEFAULTS};for(let d of Object.keys(this.DEFAULTS))i[d]!==void 0&&(u[d]=Js(i[d]));return this.finalizeSettings(u,t)}catch(r){console.warn("[SETTINGS] Failed to load settings, using defaults:",e,r instanceof Error?r.message:String(r));let o=this.getAllDefaults();return this.finalizeSettings(o,t)}}};var jt=require("crypto");function te(n){let e=(n??"").normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s]/gu," ").replace(/\s+/g," ").trim();return/[\p{L}\p{N}]/u.test(e)?e:""}function X(n){return(n??"").toLowerCase().trim().split(/\s+/).filter(Boolean)}function He(n,e){return Math.log(1+e/(n+.5))}function Gt(n,e){return t=>He(n(t),e)}function Ht(n,e){let t=new Map;for(let s of new Set(n))t.set(s,e(s));return t}function Xt(n,e,t){let s=Ht(n,t),r=Ht(e,t),o=0,i=0,a=0;for(let[_,E]of s){i+=E*E;let u=r.get(_);u!==void 0&&(o+=E*u)}for(let[,_]of r)a+=_*_;return i===0||a===0?0:o/Math.sqrt(i*a)}function $t(n,e,t,s){let r=new Set(n),o=new Set(e);for(let i of r)if(!o.has(i)&&t(i)>s)return!0;for(let i of o)if(!r.has(i)&&t(i)>s)return!0;return!1}function Xe(n,e,t,s){let r=te(n);if(r!==""&&r===te(e))return{tier:"exact",method:"exact",score:1};let o=X(n),i=X(e),a=s.minSharedTokens??2,_=new Set(i),E=0;for(let d of new Set(o))_.has(d)&&E++;if(E<a)return{tier:"none",method:"none",score:0};let u=Xt(o,i,t);return u>=s.cosineThreshold&&!$t(o,i,t,s.vetoThetaIdf)?{tier:"candidate",method:"idf_cosine",score:u}:{tier:"none",method:"none",score:u}}function se(n,e){return!!n&&!!e}function Re(n,e,t,s=!1){let r=te(t);if(r==="")return null;let o=N(e),i=s?"subagent":"main";return(0,jt.createHash)("sha256").update(`${n}\0${o}\0${i}\0${r}`).digest("hex").slice(0,32)}function Wt(n,e,t){return t===null?null:n.prepare("SELECT id, occurrence_count, created_at_epoch FROM observations WHERE project = ? AND title_norm_key = ? ORDER BY created_at_epoch ASC, id ASC LIMIT 1").get(e,t)??null}function Kt(n,e,t){let s=[...new Set(X(t))],r=n.prepare("INSERT INTO token_df (project, token, df) VALUES (?, ?, 1) ON CONFLICT(project, token) DO UPDATE SET df = df + 1");for(let o of s)r.run(e,o);n.prepare("INSERT INTO dedup_meta (project, doc_count) VALUES (?, 1) ON CONFLICT(project) DO UPDATE SET doc_count = doc_count + 1").run(e)}function Yt(n,e){return He(n+1,e)}function Vt(n,e){return n.prepare("SELECT doc_count FROM dedup_meta WHERE project = ?").get(e)?.doc_count??0}function qt(n,e){let t=Vt(n,e),s=n.prepare("SELECT token, df FROM token_df WHERE project = ?").all(e),r=new Map(s.map(o=>[o.token,o.df]));return{idfFn:Gt(o=>r.get(o)??0,t),docCount:t}}function Jt(n){return n.prepare("INSERT OR IGNORE INTO observation_dedup_candidates (observation_id, duplicate_of_id, project, method, score, status, created_at, created_at_epoch) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")}function zt(n,e,t){return Vt(n,e)>=t}function Qs(n,e,t=Number.POSITIVE_INFINITY){let s=n.prepare("SELECT COUNT(*) c FROM observations WHERE project = ?").get(e).c;if(s>t)return c.warn("DEDUP",`Skipping dedup backfill for project ${e}: ${s} rows exceeds cap ${t} (CLAUDE_MEM_DEDUP_MAX_BACKFILL_ROWS)`),0;let r=n.prepare("SELECT o.id, o.title, o.agent_id, o.agent_type, s.platform_source FROM observations o LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id WHERE o.project = ?").all(e),o=n.prepare("UPDATE observations SET title_norm_key = ? WHERE id = ?"),i=n.prepare("INSERT INTO token_df (project, token, df) VALUES (?, ?, ?)");return n.transaction(()=>{let _=new Map;for(let E of r){o.run(Re(e,E.platform_source,E.title,se(E.agent_id,E.agent_type)),E.id);for(let u of new Set(X(E.title)))_.set(u,(_.get(u)??0)+1)}n.prepare("DELETE FROM token_df WHERE project = ?").run(e);for(let[E,u]of _)i.run(e,E,u);n.prepare("INSERT INTO dedup_meta (project, doc_count, last_rebuild_doc_count, deleted_since_rebuild) VALUES (?, ?, ?, 0) ON CONFLICT(project) DO UPDATE SET doc_count = excluded.doc_count, last_rebuild_doc_count = excluded.last_rebuild_doc_count, deleted_since_rebuild = 0").run(e,r.length,r.length)})(),r.length}function Zs(n,e,t){let s=n.prepare("SELECT id, title FROM observations WHERE project = ? AND title IS NOT NULL ORDER BY id ASC").all(e);if(s.length<2)return 0;if(s.length>t.maxBackfillRows)return c.warn("DEDUP",`Skipping dedup sweep for project ${e}: ${s.length} rows exceeds cap ${t.maxBackfillRows}`),0;let{idfFn:r,docCount:o}=qt(n,e),i={cosineThreshold:t.cosineThreshold,vetoThetaIdf:Yt(t.idfVetoDf,o),minSharedTokens:t.minSharedTokens},a=s.map(O=>new Set(X(O.title))),_=new Map;for(let O of a)for(let L of O)_.set(L,(_.get(L)??0)+1);let E=Math.max(2,Math.ceil(Math.sqrt(s.length))*4),u=new Map;a.forEach((O,L)=>{for(let g of O){let T=_.get(g);if(T<2||T>E)continue;let M=u.get(g);M||(M=[],u.set(g,M)),M.push(L)}});let d=new Map;for(let O of u.values())for(let L=0;L<O.length;L++)for(let g=L+1;g<O.length;g++){let T=`${O[L]}:${O[g]}`;d.set(T,(d.get(T)??0)+1)}let l=Jt(n),p=new Date().toISOString(),A=Date.now(),C=0;for(let[O,L]of d){if(L<t.minSharedTokens)continue;let[g,T]=O.split(":").map(Number),M=Xe(s[g].title,s[T].title,r,i);M.tier==="candidate"&&(C+=l.run(s[T].id,s[g].id,e,M.method,M.score,"pending",p,A).changes)}return C}function Qt(n,e){return n.prepare("SELECT DISTINCT project FROM observations").all().map(s=>s.project).map(s=>{let r=Qs(n,s,e.maxBackfillRows),o=Zs(n,s,e);return{project:s,docs:r,candidates:o}})}function Zt(n,e,t,s,r){if(!s)return 0;let{idfFn:o,docCount:i}=qt(n,e),a={cosineThreshold:r.cosineThreshold,vetoThetaIdf:Yt(r.idfVetoDf,i),minSharedTokens:r.minSharedTokens},_=n.prepare("SELECT id, title FROM observations WHERE project = ? AND id != ? AND title IS NOT NULL ORDER BY created_at_epoch DESC, id DESC LIMIT ?").all(e,t,r.maxScan);_.length===r.maxScan&&c.debug("DEDUP",`Tier-1 scan hit MAX_SCAN=${r.maxScan} for project ${e}; older rows covered by dedup-scan`);let E=Jt(n),u=new Date().toISOString(),d=Date.now(),l=0;for(let p of _){let A=Xe(s,p.title,o,a);A.tier==="candidate"&&(l+=E.run(t,p.id,e,A.method,A.score,"pending",u,d).changes)}return l}function es(n,e,t,s,r){let o=Date.now()-s,i=r!==void 0?"up.session_db_id = ?":"up.content_session_id = ?",a=r??e;return n.prepare(`
    SELECT
      up.*,
      s.memory_session_id,
      s.project,
      COALESCE(s.platform_source, '${S}') as platform_source
    FROM user_prompts up
    JOIN sdk_sessions s ON up.session_db_id = s.id
    WHERE ${i}
      AND up.prompt_text = ?
      AND up.created_at_epoch >= ?
    ORDER BY up.created_at_epoch DESC
    LIMIT 1
  `).get(a,t,o)??void 0}var fe=require("fs");var Oe=String.raw`[A-Za-z0-9_.\-+/=~@#$%^*!?]`,er=`(?=${Oe}{8})${Oe}*[A-Za-z]${Oe}*`,ge=String.raw`(?:\\{0,3}["'])?`,oe=String.raw`\s{0,8}`;function $e(n){return new RegExp(`${n}${er}`,"gi")}function Ne(n){return`(?<=${n}${ge}${oe}[=:]${oe}${ge})`}var tr=[{name:"aws_access_key",regex:/(?:AKIA|ASIA)[0-9A-Z]{16}/g},{name:"aws_secret_key",regex:new RegExp(`${Ne(String.raw`(?:aws_secret_access_key|\bSecretAccessKey)`)}[A-Za-z0-9/+=]{40}`,"gi")},{name:"aws_session_token",regex:new RegExp(`${Ne(String.raw`\b(?:aws_session_token|SessionToken)`)}[A-Za-z0-9/+=]{100,}`,"gi")},{name:"github_pat",regex:/\bgh[oprsu]_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{82}\b/g},{name:"openai_key",regex:/\bsk-(?!ant-)[A-Za-z0-9_-]{20,}(?!\w)/g},{name:"anthropic_key",regex:/\bsk-ant-[A-Za-z0-9_-]{20,}(?!\w)/g},{name:"slack_token",regex:/\bxox[baprs]-[A-Za-z0-9-]{10,}(?!\w)/g},{name:"jwt",regex:/\beyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+(?!\w)/g},{name:"private_key_pem",regex:/-----BEGIN (?:RSA |DSA |EC |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY(?: BLOCK)?-----[\s\S]*?-----END (?:RSA |DSA |EC |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY(?: BLOCK)?-----/g},{name:"stripe_key",regex:/\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{24,}\b/g},{name:"google_api_key",regex:/\bAIza[0-9A-Za-z_-]{35}(?!\w)/g},{name:"claude_mem_key",regex:/\bcmem_[A-Za-z0-9_-]{32,}|\bcm_pro_[A-Za-z0-9_-]{8,}/g}],sr=[{name:"generic_password",regex:$e(Ne(String.raw`\b(?:\w*_?(?:password|passwd)|\w+_pwd)`))},{name:"generic_token",regex:$e(Ne(String.raw`\b\w*_(?:token|secret|api_key)`))},{name:"bearer_token",regex:$e(`(?<=\\bAuthorization${ge}${oe}:${oe}${ge}Bearer${oe})`)}],rr=1024*1024,nr="<redacted type='oversize'/>";function rs(n,e){if(!e.enabled||n.length===0)return{redacted:n,counts:{},oversize:!1};if(n.length>rr)return c.warn("REDACT","field exceeds the 1M-char redaction cap; replaced by an oversize marker",void 0,{inputLength:n.length}),{redacted:nr,counts:{oversize:1},oversize:!0};let t=new Set(e.disabledBuiltinPatterns??[]),s={},r=n,o=[];for(let a of e.customPatterns??[]){if(!a.name||a.name.length===0){c.warn("REDACT","custom pattern skipped: missing name",void 0,{pattern:a});continue}try{o.push({name:a.name,regex:new RegExp(a.regex,"g")})}catch(_){c.warn("REDACT","custom pattern skipped: invalid regex",{name:a.name},_ instanceof Error?_:new Error(String(_)))}}let i=[...o,...tr,...e.genericEnabled?sr:[]];for(let a of i)t.has(a.name)||(a.regex.lastIndex=0,r=r.replace(a.regex,()=>(s[a.name]=(s[a.name]??0)+1,`<redacted type='${a.name}'/>`)));return e.logMatches&&Object.keys(s).length>0&&c.debug("REDACT","patterns matched",void 0,{counts:s}),{redacted:r,counts:s,oversize:!1}}function or(n){if(!n||n.trim()==="")return[];try{let e=JSON.parse(n);return Array.isArray(e)?e.filter(t=>t&&typeof t.name=="string"&&typeof t.regex=="string"):(c.warn("REDACT","CLAUDE_MEM_REDACT_CUSTOM_PATTERNS is not a JSON array, ignoring"),[])}catch(e){return c.warn("REDACT","failed to parse CLAUDE_MEM_REDACT_CUSTOM_PATTERNS as JSON",void 0,e instanceof Error?e:new Error(String(e))),[]}}function ir(n){return{enabled:n.CLAUDE_MEM_REDACT_ENABLED==="true",disabledBuiltinPatterns:(n.CLAUDE_MEM_REDACT_DISABLED_BUILTINS??"").split(",").map(e=>e.trim()).filter(Boolean),customPatterns:or(n.CLAUDE_MEM_REDACT_CUSTOM_PATTERNS??"[]"),logMatches:n.CLAUDE_MEM_REDACT_LOG_MATCHES==="true",genericEnabled:n.CLAUDE_MEM_REDACT_GENERIC_ENABLED==="true"}}var re=null,ts=0,ar=5e3,ne=null,ss=!1,_r={enabled:!0,disabledBuiltinPatterns:[],customPatterns:[],logMatches:!1},Er=/"CLAUDE_MEM_REDACT_ENABLED"\s*:\s*"true"/;function dr(n){if(!(0,fe.existsSync)(n))return null;try{return(0,fe.readFileSync)(n,"utf-8")}catch{return""}}function ur(n){if(n===null)return!1;try{let e=JSON.parse(De(n));return e===null||typeof e!="object"||Array.isArray(e)}catch{return!0}}function cr(n,e,t){return process.env.CLAUDE_MEM_REDACT_ENABLED==="false"||!(ne?.enabled===!0||Er.test(e))?t:(ss||(ss=!0,c.warn("REDACT","settings.json could not be read; secret redaction stays on until it is repaired",{settingsPath:n,using:ne?.enabled?"the last configuration that loaded":"the built-in patterns"})),ne?.enabled?ne:_r)}function ns(n=le){let e=Date.now();if(re&&e-ts<ar)return re;let t=V.loadFromFile(n),s=ir(t),r=s.enabled?null:dr(n);return ur(r)?re=cr(n,r,s):(re=s,ne=s),ts=e,re}var qn=new RegExp(`^${Oe}{8,}$`);var _s=["private","claude-mem-context","system_instruction","system-instruction","persisted-output","system-reminder"],lr=new Set(_s),os=/<([A-Za-z_][A-Za-z0-9_-]*)/y,is=/<\/([A-Za-z_][A-Za-z0-9_-]*)\s*>/y;function pr(n){let e=Object.fromEntries(_s.map(u=>[u,0]));if(!n.includes("<"))return{text:n,counts:e,total:0};let t=n.length,s=new Int32Array(t+1);s[t]=t;for(let u=t-1;u>=0;u--)s[u]=n.charCodeAt(u)===62?u:s[u+1];let r=new Map,o=[],i=0,a=0;for(;a<t;){if(n.charCodeAt(a)!==60){a+=1;continue}is.lastIndex=a;let u=is.exec(n);if(u){let l=u[1],p=r.get(l),A=p&&p.head<p.items.length?p.items[p.head]:void 0;A&&a>=A.attrEnd&&(p.head+=1,o.push([A.start,a+u[0].length]),e[l]+=1,i+=1),a+=u[0].length;continue}os.lastIndex=a;let d=os.exec(n);if(d&&lr.has(d[1])){let l=d[1],p=a+d[0].length,A={start:a,attrEnd:s[p]},C=r.get(l);C?C.items.push(A):r.set(l,{items:[A],head:0}),a=p;continue}a+=1}o.sort((u,d)=>u[0]-d[0]);let _="",E=0;for(let[u,d]of o)u>E&&(_+=n.slice(E,u)),d>E&&(E=d);return _+=n.slice(E),{text:_,counts:e,total:i}}var as=100;function mr(n){return Tr(n,pr(n))}function Tr(n,{text:e,counts:t,total:s}){return s>as&&c.warn("SYSTEM","tag count exceeds limit",void 0,{tagCount:s,maxAllowed:as,contentLength:n.length}),{stripped:rs(e.trim(),ns()).redacted,counts:t}}function Ce(n){return mr(n).stripped}var Sr=["task-notification"],Zn=new RegExp(`^\\s*<(${Sr.join("|")})\\b[^>]*>(?:(?!<\\1\\b|</\\1\\b)[\\s\\S])*</\\1>\\s*$`),eo=256*1024;var je=4e3,We="[media prompt]";function ie(n){let e=Ce(n).trim();return e.length<=je?e:(c.debug("DB","Truncated stored prompt text to the configured cap",{originalLength:e.length,storedLength:je}),`${e.slice(0,je-1)}\u2026`)}var Ar=require("bun:sqlite");var Es=5e3,Rr=4194304,J=68;function ds(n){return n.prepare("PRAGMA user_version").get().user_version}var ae=class extends Error{reason="schema_newer_than_binary";constructor(e){super(e),this.name="SchemaNewerThanBinaryError"}};function _e(n,e){n.run(`PRAGMA busy_timeout = ${Es}`);let t=ds(n);if(!(t<=e))throw new ae(`SQLite database has schema v${t}; this claude-mem knows up to schema v${e}. Upgrade claude-mem before opening this database.`)}function Ke(n,e){_e(n,e),ds(n)<e&&n.run(`PRAGMA user_version = ${e}`)}function us(n,e){n.transaction(()=>Ke(n,e)).immediate()}function Or(n){return n.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
      AND name NOT LIKE 'sqlite_%'
    LIMIT 1
  `).get()!=null}function q(n,e,t){try{n.run(e)}catch(s){let r=s instanceof Error?s:new Error(String(s));throw c.warn("DB",`Failed to apply SQLite pragma ${t}`,{sql:e},r),s}}function Ie(n,e={}){let{enableWal:t=!0,enableIncrementalAutoVacuum:s=!0}=e;q(n,`PRAGMA busy_timeout = ${Es}`,"busy_timeout"),q(n,"PRAGMA foreign_keys = ON","foreign_keys"),q(n,"PRAGMA synchronous = NORMAL","synchronous"),q(n,`PRAGMA journal_size_limit = ${Rr}`,"journal_size_limit"),s&&!Or(n)&&q(n,"PRAGMA auto_vacuum = INCREMENTAL","auto_vacuum"),t&&q(n,"PRAGMA journal_mode = WAL","journal_mode")}var cs=!1;function Ye(n,...e){return typeof n.iterate=="function"?n.iterate(...e):(cs||(cs=!0,c.warn("DB","bun:sqlite lacks Statement.iterate(); falling back to .all()",{bunVersion:typeof Bun<"u"?Bun.version:"unknown",requiredBunVersion:">=1.1.31",impact:"rows are materialized in memory; upgrade Bun to restore streaming"})),n.all(...e))}function Ve(n,e,t,s){try{let r=Number(s.limit);if(!Number.isInteger(r)||r<0)throw new Error("Page limit must be a non-negative integer");let o=Number(s.offset??0);if(!Number.isInteger(o))throw new Error("Page offset must be an integer");let i=[];if(r===0)return i;let a=Math.max(0,o);for(let _ of Ye(n,...e))if(t(_)){if(a>0){a--;continue}if(i.push(_),i.length===r)break}return i}finally{n.finalize()}}var ze=require("bun:sqlite");function z(n){return n.replace(/\\/g,"/").replace(/\/+/g,"/").replace(/\/+$/,"")}function qe(n,e){let t=z(n),s=z(e);if(t.startsWith(s+"/"))return!t.slice(s.length+1).includes("/");let r=s.split("/"),o=t.split("/");if(o.length<2)return s===""||s===".";let i=o.slice(0,-1).join("/"),a=o[o.length-1],_=/^([A-Za-z]:)?\//;if(!_.test(s)&&_.test(t)&&s!==""&&i.endsWith("/"+s))return a!=="";if(s.endsWith("/"+i)||s===i)return!a.includes("/");for(let E=0;E<r.length;E++)if(r.slice(E).join("/")===i)return!0;return!1}var Le=class extends Error{constructor(t,s=500,r,o){super(t);this.statusCode=s;this.code=r;this.details=o;this.name="AppError"}statusCode;code;details};var gr=/^\d{4}-\d{2}-\d{2}$/,Nr=/^(\d{4})-(\d{2})-(\d{2})/,fr=1440*60*1e3;function $(n,e){if(typeof n=="number")return ls(n,n,e);let t=n.trim(),s=Cr(t)?new Date(t).getTime():Number.NaN,r=ls(s,n,e);return e==="end"&&gr.test(t)?r+fr-1:r}function Cr(n){let e=Nr.exec(n);if(!e)return!0;let[t,s,r]=e.slice(1).map(Number),o=new Date(0);return o.setUTCFullYear(t,s-1,r),o.getUTCFullYear()===t&&o.getUTCMonth()===s-1&&o.getUTCDate()===r}function ls(n,e,t){if(Number.isNaN(n))throw new Le(`Invalid date for the ${t} of the range: ${JSON.stringify(e)}. Use an ISO date such as 2025-01-31 or 2025-01-31T08:00:00Z.`,400,"INVALID_DATE");return n}var Je="\\u0E00-\\u0EFF\\u1000-\\u109F\\u1780-\\u17FF\\u3040-\\u30FF\\u3100-\\u318F\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uAC00-\\uD7AF\\uF900-\\uFAFF",ps=["observations_ai","observations_ad","observations_au"],ms=["session_summaries_ai","session_summaries_ad","session_summaries_au"],Ee=`
  CREATE TRIGGER IF NOT EXISTS observations_ai AFTER INSERT ON observations BEGIN
    INSERT INTO observations_fts(rowid, title, subtitle, narrative, text, facts, concepts)
    VALUES (new.id, new.title, new.subtitle, new.narrative, new.text, new.facts, new.concepts);
  END;

  CREATE TRIGGER IF NOT EXISTS observations_ad AFTER DELETE ON observations BEGIN
    INSERT INTO observations_fts(observations_fts, rowid, title, subtitle, narrative, text, facts, concepts)
    VALUES('delete', old.id, old.title, old.subtitle, old.narrative, old.text, old.facts, old.concepts);
  END;

  CREATE TRIGGER IF NOT EXISTS observations_au
  AFTER UPDATE OF title, subtitle, narrative, text, facts, concepts ON observations BEGIN
    INSERT INTO observations_fts(observations_fts, rowid, title, subtitle, narrative, text, facts, concepts)
    VALUES('delete', old.id, old.title, old.subtitle, old.narrative, old.text, old.facts, old.concepts);
    INSERT INTO observations_fts(rowid, title, subtitle, narrative, text, facts, concepts)
    VALUES (new.id, new.title, new.subtitle, new.narrative, new.text, new.facts, new.concepts);
  END;
`,de=`
  CREATE TRIGGER IF NOT EXISTS session_summaries_ai AFTER INSERT ON session_summaries BEGIN
    INSERT INTO session_summaries_fts(rowid, request, investigated, learned, completed, next_steps, notes)
    VALUES (new.id, new.request, new.investigated, new.learned, new.completed, new.next_steps, new.notes);
  END;

  CREATE TRIGGER IF NOT EXISTS session_summaries_ad AFTER DELETE ON session_summaries BEGIN
    INSERT INTO session_summaries_fts(session_summaries_fts, rowid, request, investigated, learned, completed, next_steps, notes)
    VALUES('delete', old.id, old.request, old.investigated, old.learned, old.completed, old.next_steps, old.notes);
  END;

  CREATE TRIGGER IF NOT EXISTS session_summaries_au
  AFTER UPDATE OF request, investigated, learned, completed, next_steps, notes ON session_summaries BEGIN
    INSERT INTO session_summaries_fts(session_summaries_fts, rowid, request, investigated, learned, completed, next_steps, notes)
    VALUES('delete', old.id, old.request, old.investigated, old.learned, old.completed, old.next_steps, old.notes);
    INSERT INTO session_summaries_fts(rowid, request, investigated, learned, completed, next_steps, notes)
    VALUES (new.id, new.request, new.investigated, new.learned, new.completed, new.next_steps, new.notes);
  END;
`,Ts=class n{db;constructor(e=pe,t={}){e instanceof ze.Database?this.db=e:(me(D),this.db=new ze.Database(e)),_e(this.db,J),t.readOnly||Ie(this.db),this._fts5Available=this.isFts5Available(),t.readOnly||this.ensureFTSTables()}_fts5Available;ensureFTSTables(){let e=this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%_fts'").all(),t=e.some(o=>o.name==="observations_fts"),s=e.some(o=>o.name==="session_summaries_fts");if(t&&s&&this.hasAllFtsTriggers(ps)&&this.hasAllFtsTriggers(ms))return;if(!this.isFts5Available()){c.warn("DB","FTS5 not available on this platform \u2014 skipping FTS table creation (search uses ChromaDB)");return}let r=t&&s;c.info("DB",r?"Converging FTS5 indexes and recreating missing sync triggers":"Creating FTS5 tables");try{this.db.transaction(()=>{Ke(this.db,J);let o=this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%_fts'").all(),i=!o.some(u=>u.name==="observations_fts"),a=!o.some(u=>u.name==="session_summaries_fts"),_=!i&&!this.hasAllFtsTriggers(ps),E=!a&&!this.hasAllFtsTriggers(ms);this.createFTSTablesAndTriggers(i,a),_&&(this.rebuildFtsIndex("observations_fts"),this.db.run(Ee)),E&&(this.rebuildFtsIndex("session_summaries_fts"),this.db.run(de))}).immediate(),c.info("DB",r?"FTS5 indexes converged and sync triggers recreated":"FTS5 tables created successfully")}catch(o){if(o instanceof ae)throw o;this._fts5Available=!1,c.warn("DB","FTS5 table creation failed \u2014 search will use ChromaDB and LIKE queries",{},o instanceof Error?o:void 0)}}hasAllFtsTriggers(e){let t=e.map(()=>"?").join(", ");return this.db.prepare(`SELECT name FROM sqlite_master WHERE type='trigger' AND name IN (${t})`).all(...e).length===e.length}rebuildFtsIndex(e){this.db.run(`INSERT INTO ${e}(${e}) VALUES('rebuild')`)}isFts5Available(){try{return this.db.run("CREATE VIRTUAL TABLE temp._fts5_probe USING fts5(test_column)"),this.db.run("DROP TABLE temp._fts5_probe"),!0}catch(e){return c.debug("DB","FTS5 probe failed \u2014 FTS5 unavailable on this platform",void 0,e instanceof Error?e:new Error(String(e))),!1}}canReadFtsIndex(e){try{return this.db.prepare(`SELECT rowid FROM ${e} WHERE ${e} MATCH ? LIMIT 0`).all('"fts_read_probe"'),!0}catch{return!1}}createFTSTablesAndTriggers(e,t){e&&(this.db.run(`
        CREATE VIRTUAL TABLE IF NOT EXISTS observations_fts USING fts5(
          title,
          subtitle,
          narrative,
          text,
          facts,
          concepts,
          content='observations',
          content_rowid='id'
        );
      `),this.db.run(`
        INSERT INTO observations_fts(rowid, title, subtitle, narrative, text, facts, concepts)
        SELECT id, title, subtitle, narrative, text, facts, concepts
        FROM observations;
      `),this.db.run(Ee)),t&&(this.db.run(`
        CREATE VIRTUAL TABLE IF NOT EXISTS session_summaries_fts USING fts5(
          request,
          investigated,
          learned,
          completed,
          next_steps,
          notes,
          content='session_summaries',
          content_rowid='id'
        );
      `),this.db.run(`
        INSERT INTO session_summaries_fts(rowid, request, investigated, learned, completed, next_steps, notes)
        SELECT id, request, investigated, learned, completed, next_steps, notes
        FROM session_summaries;
      `),this.db.run(de))}buildFilterClause(e,t,s="o"){let r=[],o=P(e);if(o.length>0){let i=x(s,o,{includeMerged:!0});r.push(i.sql),t.push(...i.params)}if(e.platformSource&&(r.push(`COALESCE(NULLIF((SELECT s2.platform_source FROM sdk_sessions s2 WHERE s2.memory_session_id = ${s}.memory_session_id), ''), '${S}') = ?`),t.push(N(e.platformSource))),e.type)if(Array.isArray(e.type)){let i=e.type.map(()=>"?").join(",");r.push(`${s}.type IN (${i})`),t.push(...e.type)}else r.push(`${s}.type = ?`),t.push(e.type);if(e.dateRange){let{start:i,end:a}=e.dateRange;i&&(r.push(`${s}.created_at_epoch >= ?`),t.push($(i,"start"))),a&&(r.push(`${s}.created_at_epoch <= ?`),t.push($(a,"end")))}if(e.concepts){let i=Array.isArray(e.concepts)?e.concepts:[e.concepts],a=`${s}.concepts`,_=`CASE WHEN json_valid(${a}) THEN CASE
        WHEN json_type(${a}) = 'array' THEN ${a}
        WHEN json_type(${a}) = 'text' THEN json_array(json_extract(${a}, '$'))
        ELSE json_array(${a}) END ELSE json_array(${a}) END`,E=i.map(()=>`EXISTS (SELECT 1 FROM json_each(${_}) WHERE type = 'text' AND value = ?)`);E.length>0&&(r.push(`(${E.join(" OR ")})`),t.push(...i))}if(e.files){let i=Array.isArray(e.files)?e.files:[e.files],a=s==="s"?"files_edited":"files_modified",_=i.map(()=>`(
          EXISTS (SELECT 1 FROM json_each(${n.fileArrayJson(`${s}.files_read`)}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\')
          OR EXISTS (SELECT 1 FROM json_each(${n.fileArrayJson(`${s}.${a}`)}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\')
        )`);_.length>0&&(r.push(`(${_.join(" OR ")})`),i.forEach(E=>{let u=E.replace(/[\\%_]/g,"\\$&");t.push(`%${u}%`,`%${u}%`)}))}return r.length>0?r.join(" AND "):""}static UNSEGMENTED_SCRIPT=new RegExp(`[${Je}]`);static UNSEGMENTED_RUN=new RegExp(`[${Je}]+|[^\\s${Je}]+`,"g");static MAX_SUBSTRING_TERMS=500;static buildSubstringClause(e,t){let s=[...new Set(e.match(n.UNSEGMENTED_RUN)??[])].slice(0,n.MAX_SUBSTRING_TERMS);s.length===0&&s.push(e);let r=[];return{clause:`(${s.map(i=>{let a=`%${i.replace(/[\\%_]/g,"\\$&")}%`;for(let _=0;_<t.length;_+=1)r.push(a);return`(${t.map(_=>`${_} LIKE ? ESCAPE '\\'`).join(" OR ")})`}).join(" AND ")})`,params:r}}static MIN_ANY_TERM_TOKENS=3;static buildFTSMatchQuery(e){let t=(e.match(/\S+/g)??[]).filter(s=>/[\p{L}\p{N}]/u.test(s));return t.length===0?`"${e.replace(/"/g,'""')}"`:t.map(s=>`"${s.replace(/"/g,'""')}"`).join(" AND ")}buildFTSAnyTermQuery(e,t){let s=(e.match(/\S+/g)??[]).filter(a=>/[\p{L}\p{N}]/u.test(a));if(s.length<n.MIN_ANY_TERM_TOKENS)return null;let r=this.termDocFrequency(t),o=[...e].length,i;return r?o<n.ANY_TERM_SHORT_PROMPT_CHARS?i=n.pickRareTokens(s,r,n.ANY_TERM_SHORT_PROMPT_CAP):o<n.ANY_TERM_MEDIUM_PROMPT_CHARS?i=n.pickRareTokens(s,r,n.ANY_TERM_MEDIUM_PROMPT_CAP):i=n.pickRareWords(e,r):i=n.dedupeTokens(s).slice(0,n.ANY_TERM_LONG_PROMPT_CAP),i.length===0?null:i.map(a=>`"${a.replace(/"/g,'""')}"`).join(" OR ")}static ANY_TERM_SHORT_PROMPT_CHARS=200;static ANY_TERM_MEDIUM_PROMPT_CHARS=600;static ANY_TERM_SHORT_PROMPT_CAP=40;static ANY_TERM_MEDIUM_PROMPT_CAP=60;static ANY_TERM_LONG_PROMPT_CAP=40;static ANY_TERM_COMMON_SHARE=.3;static ANY_TERM_MATCHING_DOCUMENT_BUDGET=1024;static ANY_TERM_LONG_PROMPT_MAX_SHARE=.02;static ANY_TERM_LONG_PROMPT_MIN_WORD_CHARS=3;static ANY_TERM_CONTENT_TABLES={observations_fts:"observations",session_summaries_fts:"session_summaries"};vocabLookups=new Map;termDocFrequency(e){if(!this.vocabLookups.has(e)){let s=null;try{this.db.run(`CREATE VIRTUAL TABLE IF NOT EXISTS temp.${e}_vocab USING fts5vocab(main, '${e}', 'row')`),s=this.db.prepare(`SELECT doc FROM temp.${e}_vocab WHERE term = ?`)}catch(r){c.debug("DB","FTS5 vocabulary unavailable; any-term queries are capped without frequencies",{ftsTable:e},r instanceof Error?r:void 0)}this.vocabLookups.set(e,s)}let t=this.vocabLookups.get(e);if(!t)return null;try{let s=n.ANY_TERM_CONTENT_TABLES[e],r=this.db.prepare(`SELECT count(*) AS n FROM ${s}`).get().n,o=new Map;return{rows:a=>{let _=a.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Mn}","gu"),""),E=o.get(_);return E===void 0&&(E=t.get(_)?.doc??0,o.set(_,E)),E},total:r}}catch(s){return c.debug("DB","FTS5 vocabulary lookup failed; any-term queries are capped without frequencies",{ftsTable:e},s instanceof Error?s:void 0),this.vocabLookups.set(e,null),null}}static tokenRows(e,t){let s=e.match(/[\p{L}\p{N}]+/gu)??[];return s.length===0?0:Math.min(...s.map(r=>t.rows(r)))}static commonRowLimit(e,t){return Math.max(e*t,2)}static dedupeTokens(e){let t=new Set;return e.filter(s=>{let r=s.toLowerCase();return t.has(r)?!1:(t.add(r),!0)})}static pickRareTokens(e,t,s){let r=n.commonRowLimit(t.total,n.ANY_TERM_COMMON_SHARE),o=n.dedupeTokens(e),i=o.filter(d=>n.tokenRows(d,t)<r),a=i.length<=s?i:i.map(d=>({token:d,rows:n.tokenRows(d,t)})).sort((d,l)=>d.rows-l.rows).slice(0,s).map(d=>d.token);if(a.some(d=>n.tokenRows(d,t)>0))return a;let _=[...a],E=0,u=o.map(d=>({token:d,rows:n.tokenRows(d,t)})).filter(d=>d.rows>=r).sort((d,l)=>d.rows-l.rows);for(let{token:d,rows:l}of u){if(_.length===s)break;let p=/[^\x00-\x7F]/.test(d)?t.total:l;E+p>n.ANY_TERM_MATCHING_DOCUMENT_BUDGET||(_.push(d),E+=p)}return _}static pickRareWords(e,t){let s=n.commonRowLimit(t.total,n.ANY_TERM_LONG_PROMPT_MAX_SHARE),r=new Set((e.match(/[\p{L}\p{N}]+/gu)??[]).filter(i=>[...i].length>=n.ANY_TERM_LONG_PROMPT_MIN_WORD_CHARS).map(i=>i.toLowerCase())),o=[];for(let i of r){let a=t.rows(i);if(a>0&&a<s&&(o.push(i),o.length===n.ANY_TERM_LONG_PROMPT_CAP))break}return o}buildOrderClause(e="relevance",t=!0,s="observations_fts"){switch(e){case"relevance":return t?`ORDER BY ${s}.rank ASC`:"ORDER BY o.created_at_epoch DESC";case"date_desc":return"ORDER BY o.created_at_epoch DESC, o.id DESC";case"date_asc":return"ORDER BY o.created_at_epoch ASC, o.id ASC";default:return"ORDER BY o.created_at_epoch DESC"}}searchObservationsBySubstring(e,t,s,r,o){let i=n.buildSubstringClause(e,["o.title","o.subtitle","o.narrative","o.text","o.facts","o.concepts"]),a=[],_=this.buildFilterClause(t,a,"o"),E=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${i.clause}
      ${_?"AND "+_:""}
      ${this.buildOrderClause(s,!1)}
      LIMIT ? OFFSET ?
    `;return this.db.prepare(E).all(...i.params,...a,r,o)}searchSessionsBySubstring(e,t,s,r,o){let i=n.buildSubstringClause(e,["s.request","s.investigated","s.learned","s.completed","s.next_steps","s.notes"]),a={...t};delete a.type;let _=[],E=this.buildFilterClause(a,_,"s"),u=s==="date_asc"?"ORDER BY s.created_at_epoch ASC, s.id ASC":"ORDER BY s.created_at_epoch DESC, s.id DESC",d=`
      SELECT s.*, s.discovery_tokens
      FROM session_summaries s
      WHERE ${i.clause}
      ${E?"AND "+E:""}
      ${u}
      LIMIT ? OFFSET ?
    `;return this.db.prepare(d).all(...i.params,..._,r,o)}searchObservations(e,t={}){let s=[],{limit:r=50,offset:o=0,orderBy:i="relevance",...a}=t;if(!e){let _=this.buildFilterClause(a,s,"o");if(!_)return[];let E=this.buildOrderClause(i,!1),u=`
        SELECT o.*, o.discovery_tokens
        FROM observations o
        WHERE ${_}
        ${E}
        LIMIT ? OFFSET ?
      `;return s.push(r,o),this.db.prepare(u).all(...s)}if(n.UNSEGMENTED_SCRIPT.test(e))return this.searchObservationsBySubstring(e,a,i,r,o);if(this._fts5Available||this.canReadFtsIndex("observations_fts")){let _=this.buildFilterClause(a,s,"o"),E=this.buildOrderClause(i,!0,"observations_fts"),u=`
        SELECT o.*, o.discovery_tokens
        FROM observations o
        JOIN observations_fts ON observations_fts.rowid = o.id
        WHERE observations_fts MATCH ?
        ${_?"AND "+_:""}
        ${E}
        LIMIT ? OFFSET ?
      `;s.unshift(n.buildFTSMatchQuery(e));let d;try{d=this.db.prepare(u).all(...s,r,o)}catch(p){throw c.warn("DB","FTS5 observation search failed",{},p instanceof Error?p:void 0),p}if(d.length>0||o>0&&this.db.prepare(u).all(...s,1,0).length>0)return d;let l=this.searchObservationsBySubstring(e,a,i,r,o);return l.length>0||o>0&&this.searchObservationsBySubstring(e,a,i,1,0).length>0?l:this.searchFtsAnyTerm(u,e,s,r,o,"observations_fts")??l}return this.searchObservationsBySubstring(e,a,i,r,o)}searchSessions(e,t={}){let s=[],{limit:r=50,offset:o=0,orderBy:i="relevance",...a}=t;if(!e){let _={...a};delete _.type;let E=this.buildFilterClause(_,s,"s");if(!E)return[];let d=`
        SELECT s.*, s.discovery_tokens
        FROM session_summaries s
        WHERE ${E}
        ${i==="date_asc"?"ORDER BY s.created_at_epoch ASC, s.id ASC":"ORDER BY s.created_at_epoch DESC, s.id DESC"}
        LIMIT ? OFFSET ?
      `;return s.push(r,o),this.db.prepare(d).all(...s)}if(n.UNSEGMENTED_SCRIPT.test(e))return this.searchSessionsBySubstring(e,a,i,r,o);if(this._fts5Available||this.canReadFtsIndex("session_summaries_fts")){let _={...a};delete _.type;let E=this.buildFilterClause(_,s,"s"),u=i==="date_asc"?"ORDER BY s.created_at_epoch ASC, s.id ASC":i==="date_desc"?"ORDER BY s.created_at_epoch DESC, s.id DESC":"ORDER BY session_summaries_fts.rank ASC",d=`
        SELECT s.*, s.discovery_tokens
        FROM session_summaries s
        JOIN session_summaries_fts ON session_summaries_fts.rowid = s.id
        WHERE session_summaries_fts MATCH ?
        ${E?"AND "+E:""}
        ${u}
        LIMIT ? OFFSET ?
      `;s.unshift(n.buildFTSMatchQuery(e));let l;try{l=this.db.prepare(d).all(...s,r,o)}catch(A){throw c.warn("DB","FTS5 session search failed",{},A instanceof Error?A:void 0),A}if(l.length>0||o>0&&this.db.prepare(d).all(...s,1,0).length>0)return l;let p=this.searchSessionsBySubstring(e,a,i,r,o);return p.length>0||o>0&&this.searchSessionsBySubstring(e,a,i,1,0).length>0?p:this.searchFtsAnyTerm(d,e,s,r,o,"session_summaries_fts")??p}return this.searchSessionsBySubstring(e,a,i,r,o)}searchFtsAnyTerm(e,t,s,r,o,i){let a=this.buildFTSAnyTermQuery(t,i);if(!a)return null;let _=[a,...s.slice(1)],E=this.db.prepare(e).all(..._,r,o);return E.length>0||o>0&&this.db.prepare(e).all(..._,1,0).length>0?E:null}findByConcept(e,t={}){let s=[],{limit:r=50,offset:o=0,orderBy:i="date_desc",...a}=t,_={...a,concepts:e},E=this.buildFilterClause(_,s,"o"),u=this.buildOrderClause(i,!1),d=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${E}
      ${u}
      LIMIT ? OFFSET ?
    `;return s.push(r,o),this.db.prepare(d).all(...s)}hasDirectChildFile(e,t){let s=r=>{if(!r)return!1;try{let o=JSON.parse(r);if(Array.isArray(o))return o.some(i=>typeof i=="string"&&qe(i,t))}catch(o){c.debug("DB",`Failed to parse files JSON for observation ${e.id}`,void 0,o instanceof Error?o:void 0)}return!1};return s(e.files_modified)||s(e.files_read)}hasDirectChildFileSession(e,t){let s=r=>{if(!r)return!1;try{let o=JSON.parse(r);if(Array.isArray(o))return o.some(i=>typeof i=="string"&&qe(i,t))}catch(o){c.debug("DB",`Failed to parse files JSON for session summary ${e.id}`,void 0,o instanceof Error?o:void 0)}return!1};return s(e.files_read)||s(e.files_edited)}static filePathPatterns(e,t){let s=_=>_.replace(/[\\%_]/g,"\\$&"),r=t?[e,z(e),z(e).replaceAll("/","\\")]:[e],o=[...new Set(r)].map(_=>`%${s(_)}%`);if(!t||!/^([A-Za-z]:)?[\\/]/.test(e))return o;let i=z(e).split("/").filter(_=>_.length>0),a=/^[A-Za-z]:$/.test(i[0]??"")?1:0;for(let _=a;_<i.length;_+=1){let E=i.slice(_);o.push(`${s(E.join("/")+"/")}%`),e.includes("\\")&&o.push(`${s(E.join("\\")+"\\")}%`)}return o}static fileArrayJson(e){return`CASE WHEN json_valid(${e}) THEN CASE WHEN json_type(${e}) = 'array' THEN ${e} ELSE '[]' END ELSE '[]' END`}static jsonArrayLikeClause(e,t){let s=Array.from({length:t},()=>"type = 'text' AND value LIKE ? ESCAPE '\\'").join(" OR ");return`(${e.map(r=>`EXISTS (SELECT 1 FROM json_each(${n.fileArrayJson(r)}) WHERE ${s})`).join(" OR ")})`}findByFile(e,t={}){let s=[],{limit:r=50,offset:o=0,orderBy:i="date_desc",isFolder:a=!1,..._}=t;delete _.files;let E=a?"":"LIMIT ? OFFSET ?",u=n.filePathPatterns(e,a),d=this.buildFilterClause(_,s,"o");s.push(...u,...u);let l=[d,n.jsonArrayLikeClause(["o.files_read","o.files_modified"],u.length)].filter(Boolean).join(" AND "),p=`${this.buildOrderClause(i,!1)}, o.id ${i==="date_asc"?"ASC":"DESC"}`,A=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${l}
      ${p}
      ${E}
    `;a||s.push(r,o);let C=this.db.prepare(A),O=a?Ve(C,s,m=>this.hasDirectChildFile(m,e),{limit:r,offset:o}):C.all(...s),L=[],g={..._};delete g.type;let T=[],M=P(g);if(M.length>0){let m=x("s",M,{includeMerged:!0});T.push(m.sql),L.push(...m.params)}if(g.platformSource&&(T.push(`COALESCE(NULLIF((SELECT s2.platform_source FROM sdk_sessions s2 WHERE s2.memory_session_id = s.memory_session_id), ''), '${S}') = ?`),L.push(N(g.platformSource))),g.dateRange){let{start:m,end:h}=g.dateRange;m&&(T.push("s.created_at_epoch >= ?"),L.push($(m,"start"))),h&&(T.push("s.created_at_epoch <= ?"),L.push($(h,"end")))}T.push(n.jsonArrayLikeClause(["s.files_read","s.files_edited"],u.length)),L.push(...u,...u);let B=`
      SELECT s.*, s.discovery_tokens
      FROM session_summaries s
      WHERE ${T.join(" AND ")}
      ORDER BY s.created_at_epoch ${i==="date_asc"?"ASC":"DESC"}
      ${E}
    `;a||L.push(r,o);let R=this.db.prepare(B),y=a?Ve(R,L,m=>this.hasDirectChildFileSession(m,e),{limit:r,offset:o}):R.all(...L);return{observations:O,sessions:y}}findByType(e,t={}){let s=[],{limit:r=50,offset:o=0,orderBy:i="date_desc",...a}=t,_={...a,type:e},E=this.buildFilterClause(_,s,"o"),u=this.buildOrderClause(i,!1),d=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${E}
      ${u}
      LIMIT ? OFFSET ?
    `;return s.push(r,o),this.db.prepare(d).all(...s)}searchUserPrompts(e,t={}){let s=[],{limit:r=20,offset:o=0,orderBy:i="relevance",...a}=t,_=[],E=P(a);if(E.length>0){let A=x("s",E,{includeMerged:!1});_.push(A.sql),s.push(...A.params)}if(a.platformSource&&(_.push(`COALESCE(NULLIF(s.platform_source, ''), '${S}') = ?`),s.push(N(a.platformSource))),a.dateRange){let{start:A,end:C}=a.dateRange;A&&(_.push("up.created_at_epoch >= ?"),s.push($(A,"start"))),C&&(_.push("up.created_at_epoch <= ?"),s.push($(C,"end")))}if(!e){if(_.length===0)return[];let A=`WHERE ${_.join(" AND ")}`,O=`
        SELECT
          up.*,
          s.project,
          s.memory_session_id,
          COALESCE(NULLIF(s.platform_source, ''), '${S}') as platform_source
        FROM user_prompts up
        JOIN sdk_sessions s ON up.session_db_id = s.id
        ${A}
        ${i==="date_asc"?"ORDER BY up.created_at_epoch ASC, up.id ASC":"ORDER BY up.created_at_epoch DESC, up.id DESC"}
        LIMIT ? OFFSET ?
      `;return s.push(r,o),this.db.prepare(O).all(...s)}let u=e.replace(/[\\%_]/g,"\\$&");_.push("up.prompt_text LIKE ? ESCAPE '\\'"),s.push(`%${u}%`);let d=`WHERE ${_.join(" AND ")}`,p=`
      SELECT
        up.*,
        s.project,
        s.memory_session_id,
        COALESCE(NULLIF(s.platform_source, ''), '${S}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      ${d}
      ${i==="date_asc"?"ORDER BY up.created_at_epoch ASC, up.id ASC":"ORDER BY up.created_at_epoch DESC, up.id DESC"}
      LIMIT ? OFFSET ?
    `;return s.push(r,o),this.db.prepare(p).all(...s)}close(){this.db.close()}};var As=5*6e4,f=n=>typeof n=="object"&&n!==null?JSON.stringify(n):n??null;function Rs(n){let e=[],t=[],s=new Set,r=new Set;for(let o of n){for(let i of o.files_read??[])!i||s.has(i)||(s.add(i),e.push(i));for(let i of o.files_modified??[])!i||r.has(i)||(r.add(i),t.push(i))}return{files_read:e,files_edited:t}}var Ir=200,Lr=1e3,br=56,hr=57,Dr=["sync_outbox","sync_content_outbox","sync_entity_heads","sync_dead_letter","sync_pull_quarantine","sync_launch_exclusions","sync_state"];function Qe(n){let e=Number(n);return Number.isSafeInteger(e)&&e>0?e:void 0}var et=class{db;constructor(e=pe){e instanceof Ze.Database?this.db=e:(e!==":memory:"&&me(D),this.db=new Ze.Database(e)),_e(this.db,J),Ie(this.db),us(this.db,J),this.initializeSchema(),this.ensureWorkerPortColumn(),this.ensurePromptTrackingColumns(),this.removeSessionSummariesUniqueConstraint(),this.addObservationHierarchicalFields(),this.makeObservationsTextNullable(),this.createUserPromptsTable(),this.ensureDiscoveryTokensColumn(),this.createPendingMessagesTable(),this.renameSessionIdColumns(),this.addFailedAtEpochColumn(),this.addOnUpdateCascadeToForeignKeys(),this.addObservationContentHashColumn(),this.addSessionCustomTitleColumn(),this.addSessionPlatformSourceColumn(),this.addObservationModelColumns(),this.ensureMergedIntoProjectColumns(),this.addObservationSubagentColumns(),this.addObservationsUniqueContentHashIndex(),this.addObservationsMetadataColumn(),this.dropDeadPendingMessagesColumns(),this.ensurePendingMessagesToolUseIdColumn(),this.dropWorkerPidColumn(),this.ensureSDKSessionsPlatformContentIdentity(),this.ensureUserPromptsSessionDbId(),this.ensurePendingMessagesSessionToolUniqueIndex(),this.normalizeConceptTags(),this.ensureSDKSessionsObservedColumns(),this.ensureToolUsesTable(),this.ensureTelegramWrapupsTable(),this.addDedupTables(),this.refreshUnicodeTitleNormKeys(),this.ensureReinforcementColumns(),this.ensureSessionCwdColumn(),this.dropWriteOnlyUserPromptsFtsAndScopeFtsUpdateTriggers(),this.ensureProjectNocaseIndexes(),this.ensureAdvisorCallsTable(),this.ensureSessionProjectKeySourceColumn(),this.ensureWorkStateTable(),this.ensureHookSpoolConsumedTable(),this.ensureProjectRecencyIndexes(),this.ensureMergedIntoProjectCoveringIndexes(),this.ensureNativePromptIdentity(),this.dropSyncSchema(),this.ensureObservationFileIndex()}dropSyncSchema(){this.db.transaction(()=>{for(let e of["observations","session_summaries","user_prompts","work_state_entries"]){this.db.run(`DROP INDEX IF EXISTS idx_${e}_unsynced`),this.db.run(`DROP INDEX IF EXISTS ux_${e}_origin`);let t=new Set(this.db.query(`PRAGMA table_info(${e})`).all().map(s=>s.name));for(let s of["synced_at","origin_device_id","origin_local_id","sync_rev"])t.has(s)&&this.db.run(`ALTER TABLE ${e} DROP COLUMN ${s}`)}for(let e of Dr)this.db.run(`DROP TABLE IF EXISTS ${e}`);this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(66,new Date().toISOString())}).immediate()}ensureObservationFileIndex(){this.db.transaction(()=>{if(this.db.query("SELECT version FROM schema_versions WHERE version = 68").get())return;this.db.run(`CREATE TABLE IF NOT EXISTS observation_files (
        path TEXT NOT NULL,
        observation_id INTEGER NOT NULL REFERENCES observations(id) ON DELETE CASCADE,
        PRIMARY KEY (path, observation_id)
      )`),this.db.run("CREATE INDEX IF NOT EXISTS idx_observation_files_observation ON observation_files(observation_id)");let e=t=>`SELECT o.id, je.value FROM observations o, json_each(o.${t}) je
         WHERE json_valid(o.${t}) AND json_type(o.${t}) = 'array' AND je.type = 'text'`;this.db.run(`INSERT OR IGNORE INTO observation_files(observation_id, path)
        ${e("files_read")} UNION ${e("files_modified")}`),this.db.prepare("INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)").run(68,new Date().toISOString())}).immediate()}indexObservationFiles(e,t,s){let r=new Set;for(let i of[...t,...s])typeof i=="string"&&i.length>0&&r.add(i);if(r.size===0)return;let o=this.db.prepare("INSERT OR IGNORE INTO observation_files(path, observation_id) VALUES (?, ?)");for(let i of r)o.run(i,e)}ensureNativePromptIdentity(){this.db.transaction(()=>{let e=this.db.query("PRAGMA table_info(user_prompts)").all();for(let t of["native_prompt_id","native_prompt_hash"])e.some(s=>s.name===t)||this.db.run(`ALTER TABLE user_prompts ADD COLUMN ${t} TEXT`);this.db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_user_prompts_native_identity
        ON user_prompts(session_db_id, native_prompt_id) WHERE native_prompt_id IS NOT NULL`)}).immediate()}refreshUnicodeTitleNormKeys(){this.db.transaction(()=>{if(this.db.query("SELECT version FROM schema_versions WHERE version = 65").get())return;let e=this.db.prepare(`SELECT o.id, o.project, o.title, o.agent_id, o.agent_type,
        s.platform_source FROM observations o LEFT JOIN sdk_sessions s
        ON s.memory_session_id = o.memory_session_id ORDER BY o.id`),t=this.db.prepare("UPDATE observations SET title_norm_key = ? WHERE id = ?");try{for(let s of Ye(e)){let r=s;t.run(Re(r.project,r.platform_source,r.title,se(r.agent_id,r.agent_type)),r.id)}this.db.prepare("INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)").run(65,new Date().toISOString())}finally{e.finalize(),t.finalize()}}).immediate()}getIndexColumns(e){return this.db.query(`PRAGMA index_info(${JSON.stringify(e)})`).all().map(t=>t.name)}hasUniqueIndexOnColumns(e,t){return this.db.query(`PRAGMA index_list(${e})`).all().some(r=>{if(r.unique!==1)return!1;let o=this.getIndexColumns(r.name);return o.length===t.length&&o.every((i,a)=>i===t[a])})}resolvePromptSessionDbId(e,t,s){if(t!==void 0)return t;let r=s?N(s):void 0;return r?this.db.prepare(`
        SELECT id
        FROM sdk_sessions
        WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
          AND content_session_id = ?
        LIMIT 1
      `).get(S,r,e)?.id??null:this.db.prepare(`
      SELECT id
      FROM sdk_sessions
      WHERE content_session_id = ?
      ORDER BY CASE COALESCE(NULLIF(platform_source, ''), '${S}')
        WHEN '${S}' THEN 0
        ELSE 1
      END, id
      LIMIT 1
    `).get(e)?.id??null}addDedupTables(){let e=this.db.query("PRAGMA table_info(observations)").all();e.some(t=>t.name==="occurrence_count")||this.db.run("ALTER TABLE observations ADD COLUMN occurrence_count INTEGER NOT NULL DEFAULT 1"),e.some(t=>t.name==="title_norm_key")||this.db.run("ALTER TABLE observations ADD COLUMN title_norm_key TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_title_norm ON observations(project, title_norm_key)"),this.db.run(`
      CREATE TABLE IF NOT EXISTS token_df (
        project TEXT    NOT NULL,
        token   TEXT    NOT NULL,
        df      INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (project, token)
      )
    `),this.db.run(`
      CREATE TABLE IF NOT EXISTS dedup_meta (
        project                TEXT    PRIMARY KEY,
        doc_count              INTEGER NOT NULL DEFAULT 0,
        last_rebuild_doc_count INTEGER NOT NULL DEFAULT 0,
        deleted_since_rebuild  INTEGER NOT NULL DEFAULT 0
      )
    `),this.db.run(`
      CREATE TABLE IF NOT EXISTS observation_dedup_candidates (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        observation_id   INTEGER NOT NULL,
        duplicate_of_id  INTEGER NOT NULL,
        project          TEXT    NOT NULL,
        method           TEXT    NOT NULL CHECK(method IN ('exact', 'idf_cosine')),
        score            REAL    NOT NULL,
        status           TEXT    NOT NULL DEFAULT 'pending'
                                 CHECK(status IN ('pending', 'merged', 'distinct', 'dismissed')),
        created_at       TEXT    NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        metadata         TEXT,
        FOREIGN KEY (observation_id)  REFERENCES observations(id) ON DELETE CASCADE,
        FOREIGN KEY (duplicate_of_id) REFERENCES observations(id) ON DELETE CASCADE,
        UNIQUE(observation_id, duplicate_of_id)
      )
    `),this.db.run("CREATE INDEX IF NOT EXISTS idx_token_df_project ON token_df(project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_dedup_candidates_project ON observation_dedup_candidates(project, status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_dedup_candidates_obs ON observation_dedup_candidates(observation_id)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(br,new Date().toISOString())}dropWorkerPidColumn(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(32),s=this.db.query("PRAGMA table_info(pending_messages)").all().some(r=>r.name==="worker_pid");if(!(e&&!s)){if(s)try{this.db.run("DROP INDEX IF EXISTS idx_pending_messages_worker_pid"),this.db.run("ALTER TABLE pending_messages DROP COLUMN worker_pid"),c.debug("DB","Dropped worker_pid column and its index from pending_messages")}catch(r){c.warn("DB","Failed to drop worker_pid column from pending_messages",{},r instanceof Error?r:new Error(String(r)));return}e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(32,new Date().toISOString())}}ensureSDKSessionsPlatformContentIdentity(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(33),t=this.hasUniqueIndexOnColumns("sdk_sessions",["content_session_id"]),s=this.hasUniqueIndexOnColumns("sdk_sessions",["platform_source","content_session_id"]),o=this.db.query("PRAGMA table_info(sdk_sessions)").all().some(i=>i.name==="platform_source");if(!(e&&!t&&s&&o)){if(o||this.db.run(`ALTER TABLE sdk_sessions ADD COLUMN platform_source TEXT NOT NULL DEFAULT '${S}'`),this.db.run(`
      UPDATE sdk_sessions
      SET platform_source = '${S}'
      WHERE platform_source IS NULL OR platform_source = ''
    `),t){this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");try{this.rebuildSdkSessionsWithCompositeIdentity(e),this.db.run("COMMIT")}catch(i){this.db.run("ROLLBACK");let a=i instanceof Error?i:new Error(String(i));throw c.error("DB","Failed to rebuild sdk_sessions with composite identity, rolled back",{},a),i}finally{this.db.run("PRAGMA foreign_keys = ON")}return}this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS ux_sdk_sessions_platform_content ON sdk_sessions(platform_source, content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(33,new Date().toISOString())}}rebuildSdkSessionsWithCompositeIdentity(e){this.db.run("DROP TABLE IF EXISTS sdk_sessions_new"),this.db.run(`
      CREATE TABLE sdk_sessions_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_session_id TEXT NOT NULL,
        memory_session_id TEXT UNIQUE,
        project TEXT NOT NULL,
        platform_source TEXT NOT NULL DEFAULT '${S}',
        user_prompt TEXT,
        started_at TEXT NOT NULL,
        started_at_epoch INTEGER NOT NULL,
        completed_at TEXT,
        completed_at_epoch INTEGER,
        status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'completed', 'failed')),
        worker_port INTEGER,
        prompt_counter INTEGER DEFAULT 0,
        custom_title TEXT
      )
    `),this.db.run(`
      INSERT INTO sdk_sessions_new (
        id, content_session_id, memory_session_id, project, platform_source,
        user_prompt, started_at, started_at_epoch, completed_at, completed_at_epoch,
        status, worker_port, prompt_counter, custom_title
      )
      SELECT
        id, content_session_id, memory_session_id, project,
        COALESCE(NULLIF(platform_source, ''), '${S}'),
        user_prompt, started_at, started_at_epoch, completed_at, completed_at_epoch,
        status, worker_port, prompt_counter, custom_title
      FROM sdk_sessions
    `),this.db.run("DROP TABLE sdk_sessions"),this.db.run("ALTER TABLE sdk_sessions_new RENAME TO sdk_sessions"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_claude_id ON sdk_sessions(content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_sdk_id ON sdk_sessions(memory_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_project ON sdk_sessions(project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_status ON sdk_sessions(status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_started ON sdk_sessions(started_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS ux_sdk_sessions_platform_content ON sdk_sessions(platform_source, content_session_id)"),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(33,new Date().toISOString())}ensureUserPromptsSessionDbId(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(34);if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='user_prompts'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(34,new Date().toISOString());return}let r=this.db.query("PRAGMA table_info(user_prompts)").all().some(_=>_.name==="session_db_id"),i=this.db.query("PRAGMA foreign_key_list(user_prompts)").all().some(_=>_.table==="sdk_sessions"&&_.from==="content_session_id");if(e&&r&&!i)return;let a=r?`COALESCE(up.session_db_id, (
          SELECT s.id FROM sdk_sessions s
          WHERE s.content_session_id = up.content_session_id
          ORDER BY CASE COALESCE(NULLIF(s.platform_source, ''), '${S}')
            WHEN '${S}' THEN 0
            ELSE 1
          END, s.id
          LIMIT 1
        ))`:`(
          SELECT s.id FROM sdk_sessions s
          WHERE s.content_session_id = up.content_session_id
          ORDER BY CASE COALESCE(NULLIF(s.platform_source, ''), '${S}')
            WHEN '${S}' THEN 0
            ELSE 1
          END, s.id
          LIMIT 1
        )`;this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");try{this.rebuildUserPromptsWithSessionDbId(e,a),this.db.run("COMMIT")}catch(_){this.db.run("ROLLBACK");let E=_ instanceof Error?_:new Error(String(_));throw c.error("DB","Failed to rebuild user_prompts with session_db_id, rolled back",{},E),_}finally{this.db.run("PRAGMA foreign_keys = ON")}}rebuildUserPromptsWithSessionDbId(e,t){this.db.run("DROP TRIGGER IF EXISTS user_prompts_ai"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_ad"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_au"),this.db.run("DROP TABLE IF EXISTS user_prompts_new"),this.db.run(`
      CREATE TABLE user_prompts_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER,
        content_session_id TEXT NOT NULL,
        prompt_number INTEGER NOT NULL,
        prompt_text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      )
    `),this.db.run(`
      INSERT INTO user_prompts_new (
        id, session_db_id, content_session_id, prompt_number,
        prompt_text, created_at, created_at_epoch
      )
      SELECT
        up.id,
        ${t},
        up.content_session_id,
        up.prompt_number,
        up.prompt_text,
        up.created_at,
        up.created_at_epoch
      FROM user_prompts up
    `),this.db.run("DROP TABLE user_prompts"),this.db.run("ALTER TABLE user_prompts_new RENAME TO user_prompts"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_session ON user_prompts(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_claude_session ON user_prompts(content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_created ON user_prompts(created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_prompt_number ON user_prompts(prompt_number)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_lookup ON user_prompts(session_db_id, prompt_number)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_content_lookup ON user_prompts(content_session_id, prompt_number)"),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(34,new Date().toISOString())}ensurePendingMessagesSessionToolUniqueIndex(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(35);if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(35,new Date().toISOString());return}let s=this.hasUniqueIndexOnColumns("pending_messages",["session_db_id","tool_use_id"]);if(!(e&&s)){this.db.run("BEGIN TRANSACTION");try{this.recreatePendingSessionToolUniqueIndex(e),this.db.run("COMMIT")}catch(r){this.db.run("ROLLBACK");let o=r instanceof Error?r:new Error(String(r));throw c.error("DB","Failed to recreate ux_pending_session_tool index, rolled back",{},o),r}}}recreatePendingSessionToolUniqueIndex(e){this.db.run("DROP INDEX IF EXISTS ux_pending_session_tool"),this.db.run(`
      DELETE FROM pending_messages
       WHERE id IN (
         SELECT id
           FROM (
             SELECT id,
                    ROW_NUMBER() OVER (
                      PARTITION BY session_db_id, tool_use_id
                      ORDER BY CASE status
                        WHEN 'processing' THEN 0
                        WHEN 'pending' THEN 1
                        ELSE 2
                      END, id
                    ) AS duplicate_rank
               FROM pending_messages
              WHERE tool_use_id IS NOT NULL
           )
          WHERE duplicate_rank > 1
         )
    `),this.db.run(`
      CREATE UNIQUE INDEX IF NOT EXISTS ux_pending_session_tool
      ON pending_messages(session_db_id, tool_use_id)
      WHERE tool_use_id IS NOT NULL
    `),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(35,new Date().toISOString())}normalizeConceptTags(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(49))return;let t=0;this.db.transaction(()=>{t=this.db.prepare(`
        SELECT COUNT(*) AS n FROM observations
        WHERE concepts LIKE '%:%' AND json_valid(concepts)
      `).get().n,this.db.run(`
        UPDATE observations
        SET concepts = (
          SELECT json_group_array(
            CASE WHEN instr(value, ':') > 0
                 THEN trim(substr(value, 1, instr(value, ':') - 1))
                 ELSE value END)
          FROM json_each(observations.concepts))
        WHERE concepts LIKE '%:%' AND json_valid(concepts)
      `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(49,new Date().toISOString())})(),c.debug("DB",`Normalized prefixed concept tags in ${t} observations (v49)`)}dropDeadPendingMessagesColumns(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(31),t=this.db.query("PRAGMA table_info(pending_messages)").all(),s=new Set(t.map(i=>i.name)),o=["retry_count","failed_at_epoch","completed_at_epoch"].filter(i=>s.has(i));if(!(e&&o.length===0)){if(o.length>0){this.db.run("BEGIN TRANSACTION");try{this.db.run("DELETE FROM pending_messages WHERE status NOT IN ('pending', 'processing')");for(let i of o)this.db.run(`ALTER TABLE pending_messages DROP COLUMN ${i}`),c.debug("DB",`Dropped dead column ${i} from pending_messages`);e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(31,new Date().toISOString()),this.db.run("COMMIT")}catch(i){this.db.run("ROLLBACK"),c.warn("DB","Failed to drop dead columns from pending_messages",{},i instanceof Error?i:new Error(String(i)));return}return}e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(31,new Date().toISOString())}}initializeSchema(){this.db.run(`
      CREATE TABLE IF NOT EXISTS schema_versions (
        id INTEGER PRIMARY KEY,
        version INTEGER UNIQUE NOT NULL,
        applied_at TEXT NOT NULL
      )
    `),this.db.run(`
      CREATE TABLE IF NOT EXISTS sdk_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_session_id TEXT NOT NULL,
        memory_session_id TEXT UNIQUE,
        project TEXT NOT NULL,
        platform_source TEXT NOT NULL DEFAULT 'claude',
        user_prompt TEXT,
        started_at TEXT NOT NULL,
        started_at_epoch INTEGER NOT NULL,
        completed_at TEXT,
        completed_at_epoch INTEGER,
        status TEXT CHECK(status IN ('active', 'completed', 'failed')) NOT NULL DEFAULT 'active'
      );

      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_claude_id ON sdk_sessions(content_session_id);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_sdk_id ON sdk_sessions(memory_session_id);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_project ON sdk_sessions(project);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_status ON sdk_sessions(status);
      CREATE INDEX IF NOT EXISTS idx_sdk_sessions_started ON sdk_sessions(started_at_epoch DESC);

      CREATE TABLE IF NOT EXISTS observations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        text TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_observations_sdk_session ON observations(memory_session_id);
      CREATE INDEX IF NOT EXISTS idx_observations_project ON observations(project);
      CREATE INDEX IF NOT EXISTS idx_observations_type ON observations(type);
      CREATE INDEX IF NOT EXISTS idx_observations_created ON observations(created_at_epoch DESC);

      CREATE TABLE IF NOT EXISTS session_summaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT UNIQUE NOT NULL,
        project TEXT NOT NULL,
        request TEXT,
        investigated TEXT,
        learned TEXT,
        completed TEXT,
        next_steps TEXT,
        files_read TEXT,
        files_edited TEXT,
        notes TEXT,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_session_summaries_sdk_session ON session_summaries(memory_session_id);
      CREATE INDEX IF NOT EXISTS idx_session_summaries_project ON session_summaries(project);
      CREATE INDEX IF NOT EXISTS idx_session_summaries_created ON session_summaries(created_at_epoch DESC);
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(4,new Date().toISOString())}ensureWorkerPortColumn(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(s=>s.name==="worker_port")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN worker_port INTEGER"),c.debug("DB","Added worker_port column to sdk_sessions table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(5,new Date().toISOString())}ensurePromptTrackingColumns(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(a=>a.name==="prompt_counter")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN prompt_counter INTEGER DEFAULT 0"),c.debug("DB","Added prompt_counter column to sdk_sessions table")),this.db.query("PRAGMA table_info(observations)").all().some(a=>a.name==="prompt_number")||(this.db.run("ALTER TABLE observations ADD COLUMN prompt_number INTEGER"),c.debug("DB","Added prompt_number column to observations table")),this.db.query("PRAGMA table_info(session_summaries)").all().some(a=>a.name==="prompt_number")||(this.db.run("ALTER TABLE session_summaries ADD COLUMN prompt_number INTEGER"),c.debug("DB","Added prompt_number column to session_summaries table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(6,new Date().toISOString())}repairOrphanedSessionParents(e){let t=this.db.prepare(`
      SELECT COUNT(DISTINCT c.memory_session_id) AS n
      FROM ${e} c
      WHERE c.memory_session_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM sdk_sessions s WHERE s.memory_session_id = c.memory_session_id)
    `).get().n;t!==0&&(this.db.run(`
      INSERT INTO sdk_sessions
        (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
      SELECT
        c.memory_session_id,
        c.memory_session_id,
        MIN(c.project),
        MIN(c.created_at),
        MIN(c.created_at_epoch),
        'completed'
      FROM ${e} c
      WHERE c.memory_session_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM sdk_sessions s WHERE s.memory_session_id = c.memory_session_id)
      GROUP BY c.memory_session_id
      ON CONFLICT DO NOTHING
    `),c.warn("DB",`Created ${t} stub sdk_sessions parent(s) for orphaned ${e} rows before rebuild (#3378)`))}hasMemorySessionIdOnUpdateCascade(e){return this.db.query(`PRAGMA foreign_key_list(${e})`).all().some(s=>s.table==="sdk_sessions"&&s.from==="memory_session_id"&&s.on_update==="CASCADE")}carryLiveColumnsOntoNewTable(e,t,s){let r=this.db.query(`PRAGMA table_info(${e})`).all(),o=r.filter(i=>!s.includes(i.name));for(let i of o){let a=i.type?` ${i.type}`:"",_=i.dflt_value===null||i.dflt_value===void 0?"":` DEFAULT ${i.dflt_value}`;this.db.run(`ALTER TABLE ${t} ADD COLUMN "${i.name}"${a}${_}`),c.debug("DB",`Carried ${i.name} over the ${e} rebuild (#3849)`)}return r.map(i=>i.name)}removeSessionSummariesUniqueConstraint(){if(!this.db.query("PRAGMA index_list(session_summaries)").all().some(a=>a.unique===1&&a.origin==="u")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(7,new Date().toISOString());return}c.debug("DB","Removing UNIQUE constraint from session_summaries.memory_session_id"),this.db.run("BEGIN TRANSACTION"),this.repairOrphanedSessionParents("session_summaries");let s=["id","memory_session_id","project","request","investigated","learned","completed","next_steps","files_read","files_edited","notes","prompt_number","created_at","created_at_epoch"],o=this.db.query("PRAGMA table_info(session_summaries)").all().filter(a=>!s.includes(a.name));this.db.run("DROP TABLE IF EXISTS session_summaries_new"),this.db.run(`
      CREATE TABLE session_summaries_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        request TEXT,
        investigated TEXT,
        learned TEXT,
        completed TEXT,
        next_steps TEXT,
        files_read TEXT,
        files_edited TEXT,
        notes TEXT,
        prompt_number INTEGER,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);for(let a of o){let _=a.type?` ${a.type}`:"",E=a.dflt_value===null||a.dflt_value===void 0?"":` DEFAULT ${a.dflt_value}`;this.db.run(`ALTER TABLE session_summaries_new ADD COLUMN "${a.name}"${_}${E}`),c.debug("DB",`Carried ${a.name} over the session_summaries UNIQUE-constraint rebuild (#3890)`)}let i=[...s,...o.map(a=>a.name)].map(a=>`"${a}"`).join(", ");this.db.run(`
      INSERT INTO session_summaries_new (${i})
      SELECT ${i}
      FROM session_summaries
    `),this.db.run("DROP TABLE session_summaries"),this.db.run("ALTER TABLE session_summaries_new RENAME TO session_summaries"),this.db.run(`
      CREATE INDEX idx_session_summaries_sdk_session ON session_summaries(memory_session_id);
      CREATE INDEX idx_session_summaries_project ON session_summaries(project);
      CREATE INDEX idx_session_summaries_created ON session_summaries(created_at_epoch DESC);
    `),this.recreateFtsTriggersIfIndexed("session_summaries"),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(7,new Date().toISOString()),c.debug("DB","Successfully removed UNIQUE constraint from session_summaries.memory_session_id")}addObservationHierarchicalFields(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(8))return;if(this.db.query("PRAGMA table_info(observations)").all().some(r=>r.name==="title")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(8,new Date().toISOString());return}c.debug("DB","Adding hierarchical fields to observations table"),this.db.run(`
      ALTER TABLE observations ADD COLUMN title TEXT;
      ALTER TABLE observations ADD COLUMN subtitle TEXT;
      ALTER TABLE observations ADD COLUMN facts TEXT;
      ALTER TABLE observations ADD COLUMN narrative TEXT;
      ALTER TABLE observations ADD COLUMN concepts TEXT;
      ALTER TABLE observations ADD COLUMN files_read TEXT;
      ALTER TABLE observations ADD COLUMN files_modified TEXT;
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(8,new Date().toISOString()),c.debug("DB","Successfully added hierarchical fields to observations table")}makeObservationsTextNullable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(9))return;let s=this.db.query("PRAGMA table_info(observations)").all().find(r=>r.name==="text");if(!s||s.notnull===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(9,new Date().toISOString());return}c.debug("DB","Making observations.text nullable"),this.db.run("BEGIN TRANSACTION"),this.repairOrphanedSessionParents("observations"),this.db.run("DROP TABLE IF EXISTS observations_new"),this.db.run(`
      CREATE TABLE observations_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        text TEXT,
        type TEXT NOT NULL,
        title TEXT,
        subtitle TEXT,
        facts TEXT,
        narrative TEXT,
        concepts TEXT,
        files_read TEXT,
        files_modified TEXT,
        prompt_number INTEGER,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `),this.db.run(`
      INSERT INTO observations_new
      SELECT id, memory_session_id, project, text, type, title, subtitle, facts,
             narrative, concepts, files_read, files_modified, prompt_number,
             created_at, created_at_epoch
      FROM observations
    `),this.db.run("DROP TABLE observations"),this.db.run("ALTER TABLE observations_new RENAME TO observations"),this.db.run(`
      CREATE INDEX idx_observations_sdk_session ON observations(memory_session_id);
      CREATE INDEX idx_observations_project ON observations(project);
      CREATE INDEX idx_observations_type ON observations(type);
      CREATE INDEX idx_observations_created ON observations(created_at_epoch DESC);
    `),this.recreateFtsTriggersIfIndexed("observations"),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(9,new Date().toISOString()),c.debug("DB","Successfully made observations.text nullable")}recreateFtsTriggersIfIndexed(e){let t=`${e}_fts`;this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = ?").all(t).length>0&&(this.db.run(`INSERT INTO ${t}(${t}) VALUES('rebuild')`),this.db.run(e==="observations"?Ee:de))}createUserPromptsTable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(10))return;if(this.db.query("PRAGMA table_info(user_prompts)").all().length>0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(10,new Date().toISOString());return}c.debug("DB","Creating user_prompts table"),this.db.run("BEGIN TRANSACTION"),this.db.run(`
      CREATE TABLE user_prompts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER,
        content_session_id TEXT NOT NULL,
        prompt_number INTEGER NOT NULL,
        prompt_text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      );

      CREATE INDEX idx_user_prompts_session ON user_prompts(session_db_id);
      CREATE INDEX idx_user_prompts_claude_session ON user_prompts(content_session_id);
      CREATE INDEX idx_user_prompts_created ON user_prompts(created_at_epoch DESC);
      CREATE INDEX idx_user_prompts_prompt_number ON user_prompts(prompt_number);
      CREATE INDEX idx_user_prompts_lookup ON user_prompts(session_db_id, prompt_number);
      CREATE INDEX idx_user_prompts_content_lookup ON user_prompts(content_session_id, prompt_number);
    `),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(10,new Date().toISOString()),c.debug("DB","Successfully created user_prompts table")}ensureDiscoveryTokensColumn(){this.db.query("PRAGMA table_info(observations)").all().some(o=>o.name==="discovery_tokens")||(this.db.run("ALTER TABLE observations ADD COLUMN discovery_tokens INTEGER DEFAULT 0"),c.debug("DB","Added discovery_tokens column to observations table")),this.db.query("PRAGMA table_info(session_summaries)").all().some(o=>o.name==="discovery_tokens")||(this.db.run("ALTER TABLE session_summaries ADD COLUMN discovery_tokens INTEGER DEFAULT 0"),c.debug("DB","Added discovery_tokens column to session_summaries table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(11,new Date().toISOString())}createPendingMessagesTable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(16))return;if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length>0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(16,new Date().toISOString());return}c.debug("DB","Creating pending_messages table"),this.db.run(`
      CREATE TABLE pending_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER NOT NULL,
        content_session_id TEXT NOT NULL,
        message_type TEXT NOT NULL CHECK(message_type IN ('observation', 'summarize')),
        tool_name TEXT,
        tool_input TEXT,
        tool_response TEXT,
        cwd TEXT,
        last_user_message TEXT,
        last_assistant_message TEXT,
        prompt_number INTEGER,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing')),
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY (session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      )
    `),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_session ON pending_messages(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_status ON pending_messages(status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_claude_session ON pending_messages(content_session_id)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(16,new Date().toISOString()),c.debug("DB","pending_messages table created successfully")}renameSessionIdColumns(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(17))return;c.debug("DB","Checking session ID columns for semantic clarity rename");let t=0,s=(r,o,i)=>{let a=this.db.query(`PRAGMA table_info(${r})`).all(),_=a.some(u=>u.name===o);return a.some(u=>u.name===i)?!1:_?(this.db.run(`ALTER TABLE ${r} RENAME COLUMN ${o} TO ${i}`),c.debug("DB",`Renamed ${r}.${o} to ${i}`),!0):(c.warn("DB",`Column ${o} not found in ${r}, skipping rename`),!1)};s("sdk_sessions","claude_session_id","content_session_id")&&t++,s("sdk_sessions","sdk_session_id","memory_session_id")&&t++,s("pending_messages","claude_session_id","content_session_id")&&t++,s("observations","sdk_session_id","memory_session_id")&&t++,s("session_summaries","sdk_session_id","memory_session_id")&&t++,s("user_prompts","claude_session_id","content_session_id")&&t++,this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(17,new Date().toISOString()),t>0?c.debug("DB",`Successfully renamed ${t} session ID columns`):c.debug("DB","No session ID column renames needed (already up to date)")}addFailedAtEpochColumn(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(20))return;this.db.query("PRAGMA table_info(pending_messages)").all().some(r=>r.name==="failed_at_epoch")||(this.db.run("ALTER TABLE pending_messages ADD COLUMN failed_at_epoch INTEGER"),c.debug("DB","Added failed_at_epoch column to pending_messages table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(20,new Date().toISOString())}addOnUpdateCascadeToForeignKeys(){let e=!this.hasMemorySessionIdOnUpdateCascade("observations"),t=!this.hasMemorySessionIdOnUpdateCascade("session_summaries");if(!e&&!t){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(21,new Date().toISOString());return}c.debug("DB","Adding ON UPDATE CASCADE to FK constraints on observations and session_summaries"),this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");let s=["id","memory_session_id","project","text","type","title","subtitle","facts","narrative","concepts","files_read","files_modified","prompt_number","discovery_tokens","created_at","created_at_epoch"],r=`
      CREATE TABLE observations_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        text TEXT,
        type TEXT NOT NULL,
        title TEXT,
        subtitle TEXT,
        facts TEXT,
        narrative TEXT,
        concepts TEXT,
        files_read TEXT,
        files_modified TEXT,
        prompt_number INTEGER,
        discovery_tokens INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `,o=`
      CREATE INDEX idx_observations_sdk_session ON observations(memory_session_id);
      CREATE INDEX idx_observations_project ON observations(project);
      CREATE INDEX idx_observations_type ON observations(type);
      CREATE INDEX idx_observations_created ON observations(created_at_epoch DESC);
    `,i=["id","memory_session_id","project","request","investigated","learned","completed","next_steps","files_read","files_edited","notes","prompt_number","discovery_tokens","created_at","created_at_epoch"],a=`
      CREATE TABLE session_summaries_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memory_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        request TEXT,
        investigated TEXT,
        learned TEXT,
        completed TEXT,
        next_steps TEXT,
        files_read TEXT,
        files_edited TEXT,
        notes TEXT,
        prompt_number INTEGER,
        discovery_tokens INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `,_=`
      CREATE INDEX idx_session_summaries_sdk_session ON session_summaries(memory_session_id);
      CREATE INDEX idx_session_summaries_project ON session_summaries(project);
      CREATE INDEX idx_session_summaries_created ON session_summaries(created_at_epoch DESC);
    `;try{e&&(this.db.run("DROP TRIGGER IF EXISTS observations_ai"),this.db.run("DROP TRIGGER IF EXISTS observations_ad"),this.db.run("DROP TRIGGER IF EXISTS observations_au"),this.db.run("DROP TABLE IF EXISTS observations_new"),this.recreateObservationsWithCascade(r,s,o)),t&&(this.db.run("DROP TRIGGER IF EXISTS session_summaries_ai"),this.db.run("DROP TRIGGER IF EXISTS session_summaries_ad"),this.db.run("DROP TRIGGER IF EXISTS session_summaries_au"),this.db.run("DROP TABLE IF EXISTS session_summaries_new"),this.recreateSessionSummariesWithCascade(a,i,_)),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(21,new Date().toISOString()),this.db.run("COMMIT"),this.db.run("PRAGMA foreign_keys = ON"),c.debug("DB","Successfully added ON UPDATE CASCADE to FK constraints")}catch(E){throw this.db.run("ROLLBACK"),this.db.run("PRAGMA foreign_keys = ON"),E instanceof Error?E:new Error(String(E))}}recreateObservationsWithCascade(e,t,s){this.db.run(e);let o=this.carryLiveColumnsOntoNewTable("observations","observations_new",t).map(i=>`"${i}"`).join(", ");this.db.run(`INSERT INTO observations_new (${o}) SELECT ${o} FROM observations`),this.db.run("DROP TABLE observations"),this.db.run("ALTER TABLE observations_new RENAME TO observations"),this.db.run(s),this.recreateFtsTriggersIfIndexed("observations")}recreateSessionSummariesWithCascade(e,t,s){this.db.run(e);let o=this.carryLiveColumnsOntoNewTable("session_summaries","session_summaries_new",t).map(i=>`"${i}"`).join(", ");this.db.run(`INSERT INTO session_summaries_new (${o}) SELECT ${o} FROM session_summaries`),this.db.run("DROP TABLE session_summaries"),this.db.run("ALTER TABLE session_summaries_new RENAME TO session_summaries"),this.db.run(s),this.recreateFtsTriggersIfIndexed("session_summaries")}addObservationContentHashColumn(){if(this.db.query("PRAGMA table_info(observations)").all().some(s=>s.name==="content_hash")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(22,new Date().toISOString());return}this.db.run("ALTER TABLE observations ADD COLUMN content_hash TEXT"),this.db.run("UPDATE observations SET content_hash = substr(hex(randomblob(8)), 1, 16) WHERE content_hash IS NULL"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_content_hash ON observations(content_hash, created_at_epoch)"),c.debug("DB","Added content_hash column to observations table with backfill and index"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(22,new Date().toISOString())}addSessionCustomTitleColumn(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(23),s=this.db.query("PRAGMA table_info(sdk_sessions)").all().some(r=>r.name==="custom_title");e&&s||(s||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN custom_title TEXT"),c.debug("DB","Added custom_title column to sdk_sessions table")),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(23,new Date().toISOString()))}addSessionPlatformSourceColumn(){let t=this.db.query("PRAGMA table_info(sdk_sessions)").all().some(i=>i.name==="platform_source"),r=this.db.query("PRAGMA index_list(sdk_sessions)").all().some(i=>i.name==="idx_sdk_sessions_platform_source");this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(24)&&t&&r||(t||(this.db.run(`ALTER TABLE sdk_sessions ADD COLUMN platform_source TEXT NOT NULL DEFAULT '${S}'`),c.debug("DB","Added platform_source column to sdk_sessions table")),this.db.run(`
      UPDATE sdk_sessions
      SET platform_source = '${S}'
      WHERE platform_source IS NULL OR platform_source = ''
    `),r||this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(24,new Date().toISOString()))}addObservationModelColumns(){let e=this.db.query("PRAGMA table_info(observations)").all(),t=e.some(r=>r.name==="generated_by_model"),s=e.some(r=>r.name==="relevance_count");t&&s||(t||this.db.run("ALTER TABLE observations ADD COLUMN generated_by_model TEXT"),s||this.db.run("ALTER TABLE observations ADD COLUMN relevance_count INTEGER DEFAULT 0"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(26,new Date().toISOString()))}ensureSDKSessionsObservedColumns(){let e=this.db.query("PRAGMA table_info(sdk_sessions)").all(),t=e.some(r=>r.name==="observed_model"),s=e.some(r=>r.name==="observed_billing");t&&s||(t||this.db.run("ALTER TABLE sdk_sessions ADD COLUMN observed_model TEXT"),s||this.db.run("ALTER TABLE sdk_sessions ADD COLUMN observed_billing TEXT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(50,new Date().toISOString()))}ensureToolUsesTable(){Nt(this.db),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(51,new Date().toISOString())}ensureWorkStateTable(){Mt(this.db),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(61,new Date().toISOString())}ensureProjectRecencyIndexes(){this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_project_nocase_recent ON observations(project COLLATE NOCASE, created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into_nocase_recent ON observations(merged_into_project COLLATE NOCASE, created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_project_nocase_recent ON session_summaries(project COLLATE NOCASE, created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into_nocase_recent ON session_summaries(merged_into_project COLLATE NOCASE, created_at_epoch DESC)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(63,new Date().toISOString())}ensureMergedIntoProjectCoveringIndexes(){this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into_nocase_project ON observations(merged_into_project COLLATE NOCASE, project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into_nocase_project ON session_summaries(merged_into_project COLLATE NOCASE, project)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(64,new Date().toISOString())}ensureHookSpoolConsumedTable(){this.db.run(`
      CREATE TABLE IF NOT EXISTS hook_spool_consumed (
        entry_key TEXT PRIMARY KEY,
        consumed_at_epoch_ms INTEGER NOT NULL
      )
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(62,new Date().toISOString())}isHookSpoolEntryConsumed(e){return this.db.prepare("SELECT 1 FROM hook_spool_consumed WHERE entry_key = ?").get(e)!=null}markHookSpoolEntryConsumed(e,t){this.db.prepare("INSERT INTO hook_spool_consumed (entry_key, consumed_at_epoch_ms) VALUES (?, ?) ON CONFLICT(entry_key) DO UPDATE SET consumed_at_epoch_ms = excluded.consumed_at_epoch_ms").run(e,t)}clearHookSpoolEntryConsumed(e){this.db.prepare("DELETE FROM hook_spool_consumed WHERE entry_key = ?").run(e)}pruneHookSpoolConsumedMarkersBefore(e){this.db.prepare("DELETE FROM hook_spool_consumed WHERE consumed_at_epoch_ms < ?").run(e)}ensureTelegramWrapupsTable(){this.db.run(`
      CREATE TABLE IF NOT EXISTS telegram_wrapups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform_source TEXT NOT NULL,
        content_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        route_key TEXT NOT NULL,
        summary_created_at_epoch INTEGER NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('claimed', 'sent')),
        claimed_at_epoch INTEGER NOT NULL,
        sent_at_epoch INTEGER,
        UNIQUE(platform_source, content_session_id, project, route_key)
      )
    `),this.db.run("CREATE INDEX IF NOT EXISTS idx_telegram_wrapups_platform_content ON telegram_wrapups(platform_source, content_session_id)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(52,new Date().toISOString())}ensureReinforcementColumns(){let e=this.db.query("PRAGMA table_info(observations)").all();e.some(t=>t.name==="reinforcement_dates")||this.db.run("ALTER TABLE observations ADD COLUMN reinforcement_dates TEXT"),e.some(t=>t.name==="last_reinforced")||this.db.run("ALTER TABLE observations ADD COLUMN last_reinforced TEXT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(hr,new Date().toISOString())}dropWriteOnlyUserPromptsFtsAndScopeFtsUpdateTriggers(){let e=this.db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type = 'trigger'
        AND name IN ('observations_au', 'session_summaries_au')
        AND sql NOT LIKE '%UPDATE OF%'
    `).all().map(s=>s.name),t=this.db.prepare(`
      SELECT name FROM sqlite_master
      WHERE name IN ('user_prompts_fts', 'user_prompts_ai', 'user_prompts_ad', 'user_prompts_au')
    `).all();if(e.length>0||t.length>0){this.db.run("BEGIN TRANSACTION");try{e.includes("observations_au")&&(this.db.run("DROP TRIGGER observations_au"),this.db.run(Ee)),e.includes("session_summaries_au")&&(this.db.run("DROP TRIGGER session_summaries_au"),this.db.run(de)),this.db.run("DROP TRIGGER IF EXISTS user_prompts_ai"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_ad"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_au"),this.db.run("DROP TABLE IF EXISTS user_prompts_fts"),this.db.run("COMMIT")}catch(s){throw this.db.run("ROLLBACK"),c.error("DB","Failed to scope FTS update triggers / drop user_prompts_fts, rolled back",{},s instanceof Error?s:new Error(String(s))),s}c.info("DB","Scoped FTS update triggers to indexed columns and dropped the write-only user_prompts_fts",{rescopedTriggers:e,droppedUserPromptsFts:t.length>0})}this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(54,new Date().toISOString())}ensureMergedIntoProjectColumns(){this.db.query("PRAGMA table_info(observations)").all().some(s=>s.name==="merged_into_project")||this.db.run("ALTER TABLE observations ADD COLUMN merged_into_project TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into ON observations(merged_into_project)"),this.db.query("PRAGMA table_info(session_summaries)").all().some(s=>s.name==="merged_into_project")||this.db.run("ALTER TABLE session_summaries ADD COLUMN merged_into_project TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into ON session_summaries(merged_into_project)")}ensureSessionProjectKeySourceColumn(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(t=>t.name==="project_key_source")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN project_key_source TEXT"),c.debug("DB","Added project_key_source column to sdk_sessions table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(59,new Date().toISOString())}ensureSessionCwdColumn(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(t=>t.name==="cwd")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN cwd TEXT"),c.debug("DB","Added cwd column to sdk_sessions table (#2864)")),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_cwd ON sdk_sessions(cwd)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(53,new Date().toISOString())}ensureProjectNocaseIndexes(){this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_project_nocase ON observations(project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into_nocase ON observations(merged_into_project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_project_nocase ON session_summaries(project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into_nocase ON session_summaries(merged_into_project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_project_nocase ON sdk_sessions(project COLLATE NOCASE)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(55,new Date().toISOString())}ensureAdvisorCallsTable(){this.db.run(`
      CREATE TABLE IF NOT EXISTS advisor_calls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER NOT NULL,
        content_session_id TEXT NOT NULL,
        project TEXT NOT NULL,
        platform_source TEXT NOT NULL,
        tool_use_id TEXT NOT NULL,
        advisor_model TEXT,
        cwd TEXT,
        last_user_message TEXT,
        transcript_path TEXT,
        transcript_byte_offset INTEGER,
        advice TEXT NOT NULL,
        occurred_at_epoch INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY (session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      )
    `),this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS idx_advisor_calls_tool_use ON advisor_calls(tool_use_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_advisor_calls_session ON advisor_calls(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_advisor_calls_project ON advisor_calls(project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_advisor_calls_occurred ON advisor_calls(occurred_at_epoch DESC)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(58,new Date().toISOString())}recordAdvisorCall(e){let t=new Date,s=this.db.prepare(`
      INSERT OR IGNORE INTO advisor_calls
      (session_db_id, content_session_id, project, platform_source, tool_use_id, advisor_model, cwd, last_user_message, transcript_path, transcript_byte_offset, advice, occurred_at_epoch, created_at, created_at_epoch)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(e.sessionDbId,e.contentSessionId,e.project,e.platformSource,e.toolUseId,e.advisorModel??null,e.cwd??null,e.lastUserMessage??null,e.transcriptPath??null,e.transcriptByteOffset??null,e.advice,e.occurredAtEpoch,t.toISOString(),t.getTime());return s.changes>0?{id:Number(s.lastInsertRowid),inserted:!0}:{id:this.db.prepare("SELECT id FROM advisor_calls WHERE tool_use_id = ?").get(e.toolUseId)?.id??0,inserted:!1}}getAdvisorCalls(e,t,s,r){let o="SELECT * FROM advisor_calls",i=[],a=[];s?(a.push("project = ?"),i.push(s)):(a.push("project != ?"),i.push(ee)),r&&(a.push("platform_source = ?"),i.push(r)),o+=` WHERE ${a.join(" AND ")}`,o+=" ORDER BY occurred_at_epoch DESC LIMIT ? OFFSET ?",i.push(t+1,e);let _=this.db.prepare(o).all(...i);return{items:_.slice(0,t),hasMore:_.length>t,offset:e,limit:t}}getAdvisorCallById(e){return this.db.prepare("SELECT * FROM advisor_calls WHERE id = ?").get(e)??null}addObservationSubagentColumns(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(27),t=this.db.query("PRAGMA table_info(observations)").all(),s=t.some(i=>i.name==="agent_type"),r=t.some(i=>i.name==="agent_id");s||this.db.run("ALTER TABLE observations ADD COLUMN agent_type TEXT"),r||this.db.run("ALTER TABLE observations ADD COLUMN agent_id TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_agent_type ON observations(agent_type)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_agent_id ON observations(agent_id)");let o=this.db.query("PRAGMA table_info(pending_messages)").all();if(o.length>0){let i=o.some(_=>_.name==="agent_type"),a=o.some(_=>_.name==="agent_id");i||this.db.run("ALTER TABLE pending_messages ADD COLUMN agent_type TEXT"),a||this.db.run("ALTER TABLE pending_messages ADD COLUMN agent_id TEXT")}e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(27,new Date().toISOString())}ensurePendingMessagesToolUseIdColumn(){if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(28,new Date().toISOString());return}this.db.query("PRAGMA table_info(pending_messages)").all().some(r=>r.name==="tool_use_id")||this.db.run("ALTER TABLE pending_messages ADD COLUMN tool_use_id TEXT"),this.db.run("BEGIN TRANSACTION");try{this.dedupePendingMessagesByToolUseId(),this.db.run("COMMIT")}catch(r){this.db.run("ROLLBACK");let o=r instanceof Error?r:new Error(String(r));throw c.error("DB","Failed to de-dupe pending_messages by tool_use_id, rolled back",{},o),r}}dedupePendingMessagesByToolUseId(){this.db.run(`
      DELETE FROM pending_messages
       WHERE id IN (
         SELECT id
           FROM (
             SELECT id,
                    ROW_NUMBER() OVER (
                      PARTITION BY session_db_id, tool_use_id
                      ORDER BY CASE status
                        WHEN 'processing' THEN 0
                        WHEN 'pending' THEN 1
                        ELSE 2
                      END, id
                    ) AS duplicate_rank
               FROM pending_messages
              WHERE tool_use_id IS NOT NULL
           )
          WHERE duplicate_rank > 1
         )
    `),this.db.run(`
      -- tool_use_id is optional for summaries and legacy rows; enforce de-dupe
      -- only for rows that came from a concrete tool-use event.
      CREATE UNIQUE INDEX IF NOT EXISTS ux_pending_session_tool
      ON pending_messages(session_db_id, tool_use_id)
      WHERE tool_use_id IS NOT NULL
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(28,new Date().toISOString())}addObservationsUniqueContentHashIndex(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(29))return;let t=this.db.query("PRAGMA table_info(observations)").all(),s=t.some(o=>o.name==="memory_session_id"),r=t.some(o=>o.name==="content_hash");if(!s||!r){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(29,new Date().toISOString());return}this.db.run("BEGIN TRANSACTION");try{this.dedupeObservationsByContentHash(),this.db.run("COMMIT")}catch(o){this.db.run("ROLLBACK");let i=o instanceof Error?o:new Error(String(o));throw c.error("DB","Failed to de-dupe observations by content_hash, rolled back",{},i),o}}dedupeObservationsByContentHash(){this.db.run(`
      UPDATE observations
         SET content_hash = '__null_migration_' || id || '__'
       WHERE content_hash IS NULL
    `),this.db.run(`
      DELETE FROM observations
       WHERE id IN (
         SELECT id
           FROM (
             SELECT id,
                    ROW_NUMBER() OVER (
                      PARTITION BY memory_session_id, content_hash
                      ORDER BY id
                    ) AS duplicate_rank
               FROM observations
           )
          WHERE duplicate_rank > 1
       )
    `),this.db.run(`
      CREATE UNIQUE INDEX IF NOT EXISTS ux_observations_session_hash
      ON observations(memory_session_id, content_hash)
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(29,new Date().toISOString())}addObservationsMetadataColumn(){this.db.query("PRAGMA table_info(observations)").all().some(s=>s.name==="metadata")||(this.db.run("ALTER TABLE observations ADD COLUMN metadata TEXT"),c.debug("DB","Added metadata column to observations table (#2116)")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(30,new Date().toISOString())}updateMemorySessionId(e,t){let s=this.db.prepare(`
      SELECT memory_session_id
      FROM sdk_sessions
      WHERE id = ?
    `).get(e);!s||s.memory_session_id===t||this.db.transaction(()=>{this.db.prepare(`
        UPDATE sdk_sessions
        SET memory_session_id = ?
        WHERE id = ?
      `).run(t,e),this.db.prepare(`
        UPDATE tool_uses
        SET memory_session_id = ?
        WHERE session_db_id = ?
      `).run(t,e)})()}markSessionCompleted(e){let t=Date.now(),s=new Date(t).toISOString();this.db.prepare(`
      UPDATE sdk_sessions
      SET status = 'completed', completed_at = ?, completed_at_epoch = ?
      WHERE id = ?
    `).run(s,t,e)}reopenCompletedSession(e){this.db.prepare(`
      UPDATE sdk_sessions
      SET status = 'active', completed_at = NULL, completed_at_epoch = NULL
      WHERE id = ? AND status = 'completed'
    `).run(e)}ensureMemorySessionIdRegistered(e,t,s){let r=this.db.prepare(`
      SELECT id, memory_session_id, worker_port FROM sdk_sessions WHERE id = ?
    `).get(e);if(!r)throw new Error(`Session ${e} not found in sdk_sessions`);return r.memory_session_id===null?(this.db.prepare(`
        UPDATE sdk_sessions SET memory_session_id = ? WHERE id = ?
      `).run(t,e),c.info("DB","Registered memory_session_id before storage (FK fix)",{sessionDbId:e,newId:t})):r.memory_session_id!==t&&c.debug("DB","Keeping the registered memory_session_id",{sessionDbId:e,registered:r.memory_session_id,offered:t}),typeof s=="number"&&r.worker_port!==s&&this.db.prepare(`
        UPDATE sdk_sessions SET worker_port = ? WHERE id = ?
      `).run(s,e),r.memory_session_id??t}getProjectReadKeys(e){return ut(this.db,e)}getAllProjects(e){let t=e?N(e):void 0,s=`
      SELECT DISTINCT project
      FROM sdk_sessions
      WHERE project IS NOT NULL AND project != ''
        AND project != ?
    `,r=[ee];return t&&(s+=" AND COALESCE(platform_source, ?) = ?",r.push(S,t)),s+=" ORDER BY project ASC",this.db.prepare(s).all(...r).map(i=>i.project)}getProjectCatalog(){let e=this.db.prepare(`
      SELECT
        COALESCE(platform_source, '${S}') as platform_source,
        project,
        MAX(started_at_epoch) as latest_epoch
      FROM sdk_sessions
      WHERE project IS NOT NULL AND project != ''
        AND project != ?
      GROUP BY COALESCE(platform_source, '${S}'), project
      ORDER BY latest_epoch DESC
    `).all(ee),t=[],s=new Set,r={};for(let i of e){let a=N(i.platform_source);r[a]||(r[a]=[]),r[a].includes(i.project)||r[a].push(i.project),s.has(i.project)||(s.add(i.project),t.push(i.project))}let o=Rt(Object.keys(r));return{projects:t,sources:o,projectsBySource:Object.fromEntries(o.map(i=>[i,r[i]||[]]))}}getSessionCatalog(e={}){let t=Math.min(Math.max(Math.trunc(e.limit??Ir),1),Lr),s=Math.max(Math.trunc(e.offset??0),0),r=`
      SELECT
        s.content_session_id,
        s.project,
        COALESCE(s.platform_source, '${S}') as platform_source,
        s.custom_title,
        s.started_at_epoch,
        (
          (SELECT COUNT(*) FROM observations o WHERE o.memory_session_id = s.memory_session_id)
          + (SELECT COUNT(*) FROM session_summaries ss WHERE ss.memory_session_id = s.memory_session_id)
          + (SELECT COUNT(*) FROM user_prompts up WHERE up.session_db_id = s.id)
        ) as item_count
      FROM sdk_sessions s
      WHERE s.project IS NOT NULL AND s.project != ''
        AND s.project != ?
    `,o=[ee];e.project&&(r+=" AND s.project COLLATE NOCASE = ?",o.push(e.project)),e.platformSource&&(r+=` AND COALESCE(s.platform_source, '${S}') = ?`,o.push(N(e.platformSource))),r+=" ORDER BY s.started_at_epoch DESC, s.id DESC LIMIT ? OFFSET ?",o.push(t+1,s);let i=this.db.prepare(r).all(...o);return{sessions:i.slice(0,t),hasMore:i.length>t}}getUserPromptById(e){return this.db.prepare(`
      SELECT
        up.*,
        s.memory_session_id,
        s.project,
        COALESCE(s.platform_source, '${S}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.id = ?
    `).get(e)}findRecentDuplicateUserPrompt(e,t,s,r){return es(this.db,e,ie(t),s,this.resolvePromptSessionDbId(e,r)??void 0)}getRecentSessionsWithStatus(e,t=3,s){let r=[e],o="";return s&&(o=`AND COALESCE(NULLIF(s.platform_source, ''), '${S}') = ?`,r.push(N(s))),r.push(t),this.db.prepare(`
      SELECT * FROM (
        SELECT
          s.memory_session_id,
          s.status,
          s.started_at,
          s.started_at_epoch,
          s.user_prompt,
          CASE WHEN sum.memory_session_id IS NOT NULL THEN 1 ELSE 0 END as has_summary
        FROM sdk_sessions s
        LEFT JOIN session_summaries sum ON s.memory_session_id = sum.memory_session_id
        WHERE s.project COLLATE NOCASE = ? AND s.memory_session_id IS NOT NULL
        ${o}
        GROUP BY s.memory_session_id
        ORDER BY s.started_at_epoch DESC
        LIMIT ?
      )
      ORDER BY started_at_epoch ASC
    `).all(...r)}getObservationsForSession(e,t){let s=[e],r="";return t&&(r=`
        AND EXISTS (
          SELECT 1
          FROM sdk_sessions s
          WHERE s.memory_session_id = observations.memory_session_id
            AND COALESCE(NULLIF(s.platform_source, ''), '${S}') = ?
        )
      `,s.push(N(t))),this.db.prepare(`
      SELECT title, subtitle, type, prompt_number
      FROM observations
      WHERE memory_session_id = ?
      ${r}
      ORDER BY created_at_epoch ASC
    `).all(...s)}getObservationById(e,t){return t?this.db.prepare(`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id
      WHERE o.id = ?
        AND COALESCE(NULLIF(s.platform_source, ''), '${S}') = ?
    `).get(e,N(t))||null:this.db.prepare(`
        SELECT *
        FROM observations
        WHERE id = ?
      `).get(e)||null}upsertToolUse(e){return ft(this.db,e)}linkToolUsesToObservation(e){return Ct(this.db,e)}getToolUsesByIds(e,t={}){return Lt(this.db,e,t)}queryToolUses(e={}){return bt(this.db,e)}appendWorkStateEntry(e){let t=Ut(this.db,e);return j({projects:[e.project]},"appendWorkStateEntry"),t}getWorkStateEntries(e,t){return Dt(yt(this.db,this.getProjectReadKeys(e),t),e)}countToolUses(e={}){return ht(this.db,e)}getObservationsByIds(e,t={}){if(e.length===0)return[];let{orderBy:s="date_desc",platformSource:r,type:o,concepts:i,files:a}=t,_=Qe(t.limit),E=P(t),u=s==="relevance",d=s==="date_asc"?"ASC":"DESC",l=u?"":`ORDER BY o.created_at_epoch ${d}, o.id ${d}`,p=_&&!u?"LIMIT ?":"",A=e.map(()=>"?").join(","),C=[...e],O=[];if(E.length>0){let R=x("o",E,{includeMerged:!0});O.push(R.sql),C.push(...R.params)}if(r&&(O.push(`COALESCE(NULLIF(s.platform_source, ''), '${S}') = ?`),C.push(N(r))),o)if(Array.isArray(o)){let R=o.map(()=>"?").join(",");O.push(`o.type IN (${R})`),C.push(...o)}else O.push("o.type = ?"),C.push(o);if(i){let R=Array.isArray(i)?i:[i],y=`CASE WHEN json_valid(o.concepts) THEN CASE
        WHEN json_type(o.concepts) = 'array' THEN o.concepts
        WHEN json_type(o.concepts) = 'text' THEN json_array(json_extract(o.concepts, '$'))
        ELSE json_array(o.concepts) END ELSE json_array(o.concepts) END`,m=R.map(()=>`EXISTS (SELECT 1 FROM json_each(${y}) WHERE type = 'text' AND value = ?)`);m.length>0&&(C.push(...R),O.push(`(${m.join(" OR ")})`))}if(a){let R=Array.isArray(a)?a:[a],y=h=>`CASE WHEN json_valid(${h}) THEN CASE WHEN json_type(${h}) = 'array' THEN ${h} ELSE '[]' END ELSE '[]' END`,m=R.map(()=>`(EXISTS (SELECT 1 FROM json_each(${y("o.files_read")}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\') OR EXISTS (SELECT 1 FROM json_each(${y("o.files_modified")}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\'))`);m.length>0&&(R.forEach(h=>{let F=h.replace(/[\\%_]/g,"\\$&");C.push(`%${F}%`,`%${F}%`)}),O.push(`(${m.join(" OR ")})`))}let L=O.length>0?`WHERE o.id IN (${A}) AND ${O.join(" AND ")}`:`WHERE o.id IN (${A})`;p&&C.push(_);let T=this.db.prepare(`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id
      ${L}
      ${l}
      ${p}
    `).all(...C);if(!u)return T;let M=new Map(T.map(R=>[R.id,R])),B=e.map(R=>M.get(R)).filter(R=>!!R);return _?B.slice(0,_):B}getSummaryForSession(e,t){let s=[e],r="";return t&&(r=`
        AND EXISTS (
          SELECT 1
          FROM sdk_sessions sdk
          WHERE sdk.memory_session_id = session_summaries.memory_session_id
            AND COALESCE(NULLIF(sdk.platform_source, ''), '${S}') = ?
        )
      `,s.push(N(t))),this.db.prepare(`
      SELECT
        request, investigated, learned, completed, next_steps,
        files_read, files_edited, notes, prompt_number, created_at,
        created_at_epoch
      FROM session_summaries
      WHERE memory_session_id = ?
      ${r}
      ORDER BY created_at_epoch DESC, id DESC
      LIMIT 1
    `).get(...s)||null}getSessionById(e){return this.db.prepare(`
      SELECT id, content_session_id, memory_session_id, project,
             COALESCE(platform_source, '${S}') as platform_source,
             user_prompt, custom_title, status,
             observed_model, observed_billing
      FROM sdk_sessions
      WHERE id = ?
      LIMIT 1
    `).get(e)||null}findSessionDbIdByContentSessionId(e,t){return this.db.prepare(`
      SELECT id
      FROM sdk_sessions
      WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
        AND content_session_id = ?
      LIMIT 1
    `).get(S,N(t),e)?.id??null}claimTelegramWrapup({platformSource:e,contentSessionId:t,project:s,routeKey:r,summaryCreatedAtEpoch:o}){let i=Date.now();return this.db.prepare(`
      INSERT OR IGNORE INTO telegram_wrapups
      (platform_source, content_session_id, project, route_key, summary_created_at_epoch, status, claimed_at_epoch, sent_at_epoch)
      VALUES (?, ?, ?, ?, ?, 'claimed', ?, NULL)
    `).run(N(e),t,s,r,o,i).changes===1?!0:this.db.prepare(`
      UPDATE telegram_wrapups
      SET summary_created_at_epoch = ?, claimed_at_epoch = ?, sent_at_epoch = NULL
      WHERE platform_source = ?
        AND content_session_id = ?
        AND project = ?
        AND route_key = ?
        AND status = 'claimed'
        AND claimed_at_epoch <= ?
    `).run(o,i,N(e),t,s,r,i-As).changes===1}markTelegramWrapupSent({platformSource:e,contentSessionId:t,project:s,routeKey:r}){this.db.prepare(`
      UPDATE telegram_wrapups
      SET status = 'sent', sent_at_epoch = ?
      WHERE platform_source = ?
        AND content_session_id = ?
        AND project = ?
        AND route_key = ?
        AND status = 'claimed'
    `).run(Date.now(),N(e),t,s,r)}releaseTelegramWrapupClaim({platformSource:e,contentSessionId:t,project:s,routeKey:r}){this.db.prepare(`
      DELETE FROM telegram_wrapups
      WHERE platform_source = ?
        AND content_session_id = ?
        AND project = ?
        AND route_key = ?
        AND status = 'claimed'
    `).run(N(e),t,s,r)}setSessionObservedMetadata(e,t,s){this.db.prepare(`
      UPDATE sdk_sessions
      SET observed_model = COALESCE(?, observed_model),
          observed_billing = COALESCE(?, observed_billing)
      WHERE id = ?
    `).run(t||null,s||null,e)}getSdkSessionsBySessionIds(e,t=[]){if(e.length===0&&t.length===0)return[];let s=[...new Set(e),...new Set(t)],r=new Map;for(let o=0;o<s.length;o+=500){let i=s.slice(o,o+500),a=i.filter(d=>typeof d=="string"),_=i.filter(d=>typeof d=="number"),E=[];a.length&&E.push(`memory_session_id IN (${a.map(()=>"?").join(",")})`),_.length&&E.push(`id IN (SELECT session_db_id FROM user_prompts WHERE id IN (${_.map(()=>"?").join(",")}))`);let u=this.db.prepare(`
        SELECT id, content_session_id, memory_session_id, project,
               COALESCE(platform_source, '${S}') as platform_source,
               user_prompt, custom_title,
               started_at, started_at_epoch, completed_at, completed_at_epoch, status
        FROM sdk_sessions
        WHERE ${E.join(" OR ")}
        ORDER BY started_at_epoch DESC
      `);for(let d of u.all(...i))r.set(d.id,d)}return[...r.values()].sort((o,i)=>i.started_at_epoch-o.started_at_epoch)}getPromptNumberFromUserPrompts(e,t,s){let r=this.resolvePromptSessionDbId(e,t),o=r!==null?"session_db_id = ?":"content_session_id = ?",i=r!==null?r:e;return s!==void 0?this.db.prepare(`
        SELECT COALESCE(MAX(prompt_number), 0) as count FROM user_prompts WHERE ${o} AND created_at_epoch <= ?
      `).get(i,s).count:this.db.prepare(`
      SELECT COALESCE(MAX(prompt_number), 0) as count FROM user_prompts WHERE ${o}
    `).get(i).count}getLatestPromptTextFromUserPrompts(e,t){let s=this.resolvePromptSessionDbId(e,t),r=s!==null?"session_db_id = ?":"content_session_id = ?",o=s!==null?s:e;return this.db.prepare(`
      SELECT prompt_text
      FROM user_prompts
      WHERE ${r}
        AND prompt_text IS NOT NULL
        AND length(trim(prompt_text)) > 0
      ORDER BY prompt_number DESC, created_at_epoch DESC
      LIMIT 1
    `).get(o)?.prompt_text??null}createSDKSession(e,t,s,r,o){let i=new Date,a=i.getTime(),_=o?N(o):S,E=ie(s),u=this.db.prepare(`
      SELECT id, platform_source
      FROM sdk_sessions
      WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
        AND content_session_id = ?
    `).get(S,_,e);if(u)return t&&this.db.prepare(`
          UPDATE sdk_sessions SET project = ?
          WHERE id = ? AND (project IS NULL OR project = '' OR (project = 'unknown' AND cwd IS NULL))
        `).run(t,u.id),E&&E!==We&&this.db.prepare(`
          UPDATE sdk_sessions SET user_prompt = ?
          WHERE id = ? AND (user_prompt IS NULL OR user_prompt = '' OR user_prompt = ?)
        `).run(E,u.id,We),r&&this.db.prepare(`
          UPDATE sdk_sessions SET custom_title = ?
          WHERE id = ? AND custom_title IS NULL
        `).run(r,u.id),u.id;let d=this.db.prepare(`
      INSERT INTO sdk_sessions
      (content_session_id, memory_session_id, project, platform_source, user_prompt, custom_title, started_at, started_at_epoch, status)
      VALUES (?, NULL, ?, ?, ?, ?, ?, ?, 'active')
    `).run(e,t,_,E,r||null,i.toISOString(),a);return Number(d.lastInsertRowid)}setSessionCwd(e,t,s){t.trim()&&this.db.prepare("UPDATE sdk_sessions SET cwd = ?, project_key_source = ? WHERE id = ? AND cwd IS NULL").run(t,s??null,e)}getSessionCwd(e){return this.db.prepare("SELECT cwd FROM sdk_sessions WHERE id = ?").get(e)?.cwd??null}saveUserPrompt(e,t,s,r,o,i){let a=new Date,_=a.getTime(),E=ie(s),u=this.resolvePromptSessionDbId(e,r);return this.db.prepare(`
      INSERT INTO user_prompts
      (session_db_id, content_session_id, prompt_number, prompt_text, created_at, created_at_epoch, native_prompt_id, native_prompt_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(u,e,t,E,a.toISOString(),_,o??null,i??null).lastInsertRowid}saveNativeUserPrompt(e,t,s,r,o=r){if(!s||s.length>256||/[\s\x00-\x1f\x7f]/.test(s))throw new Error("Invalid native prompt identity");let i=ie(r),a=(0,Ss.createHash)("sha256").update(Ce(o).trim()).digest("hex");return this.db.transaction(()=>{let _=this.db.prepare(`SELECT id, prompt_number, native_prompt_hash FROM user_prompts
        WHERE session_db_id = ? AND native_prompt_id = ?`).get(t,s);if(_){if(_.native_prompt_hash!==a)throw new Error("Native prompt identity was reused with different text");return{id:_.id,promptNumber:_.prompt_number,duplicate:!0}}let E=this.getPromptNumberFromUserPrompts(e,t)+1;return this.reopenCompletedSession(t),{id:this.saveUserPrompt(e,E,i,t,s,a),promptNumber:E,duplicate:!1}}).immediate()}getUserPrompt(e,t,s){let r=this.resolvePromptSessionDbId(e,s);return r!==null?this.db.prepare(`
        SELECT prompt_text
        FROM user_prompts
        WHERE session_db_id = ? AND prompt_number = ?
        LIMIT 1
      `).get(r,t)?.prompt_text??null:this.db.prepare(`
      SELECT prompt_text
      FROM user_prompts
      WHERE content_session_id = ? AND prompt_number = ?
      LIMIT 1
    `).get(e,t)?.prompt_text??null}dedupConfig(){let e=V.loadFromFile(le),t=(r,o)=>{let i=Number(e[r]);return Number.isFinite(i)?i:o},s=(r,o)=>Math.trunc(t(r,o));return{enabled:e.CLAUDE_MEM_DEDUP_ENABLED==="true",cosineThreshold:t("CLAUDE_MEM_DEDUP_COSINE_THRESHOLD",.8),idfVetoDf:s("CLAUDE_MEM_DEDUP_IDF_VETO_DF",10),minSharedTokens:s("CLAUDE_MEM_DEDUP_MIN_SHARED_TOKENS",2),maxScan:s("CLAUDE_MEM_DEDUP_MAX_SCAN",2e3),maxBackfillRows:s("CLAUDE_MEM_DEDUP_MAX_BACKFILL_ROWS",5e4),minProjectDocs:s("CLAUDE_MEM_DEDUP_MIN_PROJECT_DOCS",10)}}listDedupCandidates(e,t=100,s){let r="SELECT c.id, c.project, c.method, c.score, c.status, c.created_at_epoch, c.observation_id, o1.title AS observation_title, c.duplicate_of_id, o2.title AS duplicate_of_title FROM observation_dedup_candidates c JOIN observations o1 ON o1.id = c.observation_id JOIN observations o2 ON o2.id = c.duplicate_of_id ",o="(? IS NULL OR c.status = ?) ",i="ORDER BY c.score DESC, c.id DESC LIMIT ?",a=s??null;return e?this.db.prepare(`${r}WHERE c.project = ? AND ${o}${i}`).all(e,a,a,t):this.db.prepare(`${r}WHERE ${o}${i}`).all(a,a,t)}resolveDedupCandidate(e,t){return this.db.prepare("UPDATE observation_dedup_candidates SET status = ? WHERE id = ?").run(t,e).changes>0}isDedupEnabled(){return this.dedupConfig().enabled}runDedupScan(){return Qt(this.db,this.dedupConfig())}maintainDedupOnInsert(e,t,s,r){Kt(this.db,e,s),zt(this.db,e,r.minProjectDocs)&&Zt(this.db,e,t,s,r)}storeObservation(e,t,s,r,o=0,i,a,_={}){if(!we(s.title))throw new Error("storeObservation requires a non-empty title");let E=this.storeObservations(e,t,[s],null,r,o,i,a,_);return{id:E.observationIds[0],createdAtEpoch:E.createdAtEpoch,mergedIntoExisting:E.mergedIntoExisting[0]??!1}}storeSummary(e,t,s,r,o=0,i){let a=i??Date.now(),_=new Date(a).toISOString(),u=this.db.prepare(`
      INSERT INTO session_summaries
      (memory_session_id, project, request, investigated, learned, completed,
       next_steps, files_read, files_edited, notes, prompt_number, discovery_tokens, created_at, created_at_epoch)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(e,t,s.request,s.investigated,s.learned,s.completed,s.next_steps,JSON.stringify(s.files_read??[]),JSON.stringify(s.files_edited??[]),s.notes,r||null,o,_,a);return j({projects:[t]},"storeSummary"),{id:Number(u.lastInsertRowid),createdAtEpoch:a}}storeObservations(e,t,s,r,o,i=0,a,_,E={}){let u=a??Date.now(),d=new Date(u).toISOString(),l=At(u),p=new Date(u),A=this.dedupConfig(),C=N(this.db.prepare("SELECT platform_source FROM sdk_sessions WHERE memory_session_id = ? LIMIT 1").get(e)?.platform_source),L=this.db.transaction(()=>{let g=[],T=[],M=[],B=this.db.prepare(`
        INSERT INTO observations
        (memory_session_id, project, type, title, subtitle, facts, narrative, concepts,
         files_read, files_modified, prompt_number, discovery_tokens, agent_type, agent_id, content_hash, created_at, created_at_epoch,
         generated_by_model, metadata, title_norm_key, reinforcement_dates, last_reinforced)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(memory_session_id, content_hash) DO NOTHING
        RETURNING id
      `),R=this.db.prepare("SELECT id FROM observations WHERE memory_session_id = ? AND content_hash = ?");for(let m of s){if(!we(m.title)){c.debug("DB","Skipping observation with empty title");continue}let h=lt(e,m.title,m.narrative),F=Re(t,C,m.title,se(m.agent_id,m.agent_type));if(A.enabled){let be=R.get(e,h);if(be){Se(this.db,be.id,p),g.push(be.id),T.push(!1);continue}let ue=E.skipTitleDedup?null:Wt(this.db,t,F);if(ue){this.db.prepare("UPDATE observations SET occurrence_count = occurrence_count + 1 WHERE id = ?").run(ue.id),Se(this.db,ue.id,p),g.push(ue.id),T.push(!0);continue}}let w=B.get(e,t,m.type,m.title,m.subtitle,JSON.stringify(m.facts),m.narrative,JSON.stringify(m.concepts),JSON.stringify(m.files_read),JSON.stringify(m.files_modified),o||null,i,m.agent_type??null,m.agent_id??null,h,d,u,_||null,m.metadata??null,F,l.dates,l.lastReinforced);if(w){A.enabled&&this.maintainDedupOnInsert(t,w.id,m.title,A),this.indexObservationFiles(w.id,m.files_read,m.files_modified),g.push(w.id),T.push(!1),M.push(w.id);continue}let Q=R.get(e,h);if(!Q)throw new Error(`storeObservations: ON CONFLICT without existing row for content_hash=${h}`);Se(this.db,Q.id,p),g.push(Q.id),T.push(!1)}let y=null;if(r){let m=Rs(s),h=r.files_read??m.files_read,F=r.files_edited??m.files_edited,Q=this.db.prepare(`
          INSERT INTO session_summaries
          (memory_session_id, project, request, investigated, learned, completed,
           next_steps, files_read, files_edited, notes, prompt_number, discovery_tokens, created_at, created_at_epoch)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(e,t,r.request,r.investigated,r.learned,r.completed,r.next_steps,JSON.stringify(h),JSON.stringify(F),r.notes,o||null,i,d,u);y=Number(Q.lastInsertRowid)}return{observationIds:g,mergedIntoExisting:T,insertedObservationIds:M,summaryId:y,createdAtEpoch:u}})();return j({projects:[t]},"storeObservations"),L}updateDiscoveryTokens(e,t,s){e.length===0&&t===null||this.db.transaction(()=>{let r=this.db.prepare("UPDATE observations SET discovery_tokens = ? WHERE id = ?");for(let o of e)r.run(s,o);t!==null&&this.db.prepare("UPDATE session_summaries SET discovery_tokens = ? WHERE id = ?").run(s,t)})()}getSessionSummariesByIds(e,t={}){if(e.length===0)return[];let{orderBy:s="date_desc",platformSource:r}=t,o=Qe(t.limit),i=P(t),a=s==="relevance",_=s==="date_asc"?"ASC":"DESC",E=a?"":`ORDER BY ss.created_at_epoch ${_}, ss.id ${_}`,u=o&&!a?"LIMIT ?":"",d=e.map(()=>"?").join(","),l=[...e],p=[];if(i.length>0){let T=x("ss",i,{includeMerged:!0});p.push(T.sql),l.push(...T.params)}r&&(p.push(`COALESCE(NULLIF(s.platform_source, ''), '${S}') = ?`),l.push(N(r)));let A=p.length>0?`AND ${p.join(" AND ")}`:"";u&&l.push(o);let O=this.db.prepare(`
      SELECT ss.*
      FROM session_summaries ss
      LEFT JOIN sdk_sessions s ON s.memory_session_id = ss.memory_session_id
      WHERE ss.id IN (${d}) ${A}
      ${E}
      ${u}
    `).all(...l);if(!a)return O;let L=new Map(O.map(T=>[T.id,T])),g=e.map(T=>L.get(T)).filter(T=>!!T);return o?g.slice(0,o):g}getUserPromptsByIds(e,t={}){if(e.length===0)return[];let{orderBy:s="date_desc",platformSource:r}=t,o=Qe(t.limit),i=P(t),a=s==="relevance",_=s==="date_asc"?"ASC":"DESC",E=a?"":`ORDER BY up.created_at_epoch ${_}, up.id ${_}`,u=o&&!a?"LIMIT ?":"",d=e.map(()=>"?").join(","),l=[...e],p=[];if(i.length>0){let T=x("s",i,{includeMerged:!1});p.push(T.sql),l.push(...T.params)}r&&(p.push(`COALESCE(NULLIF(s.platform_source, ''), '${S}') = ?`),l.push(N(r)));let A=p.length>0?`AND ${p.join(" AND ")}`:"";u&&l.push(o);let O=this.db.prepare(`
      SELECT
        up.*,
        s.project,
        s.memory_session_id,
        COALESCE(NULLIF(s.platform_source, ''), '${S}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.id IN (${d}) ${A}
      ${E}
      ${u}
    `).all(...l);if(!a)return O;let L=new Map(O.map(T=>[T.id,T])),g=e.map(T=>L.get(T)).filter(T=>!!T);return o?g.slice(0,o):g}getTimelineAroundTimestamp(e,t=10,s=10,r,o,i){return this.getTimelineAroundObservation(null,e,t,s,r,o,i)}getTimelineAroundObservation(e,t,s=10,r=10,o,i,a){let _=i?N(i):void 0,E=P({project:o,projects:a}),u=(R,y,m=!1)=>{let h=[],F=[];if(E.length>0){let w=x(R,E,{includeMerged:m});h.push(w.sql),F.push(...w.params)}return _&&(h.push(`COALESCE(NULLIF(${y}.platform_source, ''), '${S}') = ?`),F.push(_)),{clause:h.length>0?`AND ${h.join(" AND ")}`:"",params:F}},d=u("o","src",!0),l=u("ss","src",!0),p=u("s","s"),A,C;if(e!==null){let R=`
        SELECT o.id, o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE (o.created_at_epoch, o.id) <= (?, ?) ${d.clause}
        ORDER BY o.created_at_epoch DESC
        LIMIT ?
      `,y=`
        SELECT o.id, o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE (o.created_at_epoch, o.id) >= (?, ?) ${d.clause}
        ORDER BY o.created_at_epoch ASC
        LIMIT ?
      `;try{let m=this.db.prepare(R).all(t,e,...d.params,s+1),h=this.db.prepare(y).all(t,e,...d.params,r+1);if(m.length===0&&h.length===0)return{observations:[],sessions:[],prompts:[]};A=m.length>0?m[m.length-1].created_at_epoch:t,C=h.length>0?h[h.length-1].created_at_epoch:t}catch(m){return m instanceof Error?c.error("DB","Error getting boundary observations",{project:o},m):c.error("DB","Error getting boundary observations with non-Error",{},new Error(String(m))),{observations:[],sessions:[],prompts:[]}}}else{let R=`
        SELECT o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.created_at_epoch < ? ${d.clause}
        ORDER BY o.created_at_epoch DESC
        LIMIT ?
      `,y=`
        SELECT o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.created_at_epoch > ? ${d.clause}
        ORDER BY o.created_at_epoch ASC
        LIMIT ?
      `;try{let m=this.db.prepare(R).all(t,...d.params,s),h=this.db.prepare(y).all(t,...d.params,r);A=m.length>0?m[m.length-1].created_at_epoch:t,C=h.length>0?h[h.length-1].created_at_epoch:t}catch(m){return m instanceof Error?c.error("DB","Error getting boundary timestamps",{project:o},m):c.error("DB","Error getting boundary timestamps with non-Error",{},new Error(String(m))),{observations:[],sessions:[],prompts:[]}}}let O=`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
      WHERE o.created_at_epoch >= ? AND o.created_at_epoch <= ? ${d.clause}
      ORDER BY o.created_at_epoch ASC, o.id ASC
    `,L=`
      SELECT ss.*
      FROM session_summaries ss
      LEFT JOIN sdk_sessions src ON src.memory_session_id = ss.memory_session_id
      WHERE ss.created_at_epoch >= ? AND ss.created_at_epoch <= ? ${l.clause}
      ORDER BY ss.created_at_epoch ASC, ss.id ASC
    `,g=`
      SELECT up.*, s.project, s.memory_session_id, COALESCE(NULLIF(s.platform_source, ''), '${S}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.created_at_epoch >= ? AND up.created_at_epoch <= ? ${p.clause}
      ORDER BY up.created_at_epoch ASC, up.id ASC
    `,T=this.db.prepare(O).all(A,C,...d.params),M=this.db.prepare(L).all(A,C,...l.params),B=this.db.prepare(g).all(A,C,...p.params);return{observations:T,sessions:M.map(R=>({id:R.id,memory_session_id:R.memory_session_id,project:R.project,request:R.request,completed:R.completed,next_steps:R.next_steps,created_at:R.created_at,created_at_epoch:R.created_at_epoch})),prompts:B.map(R=>({id:R.id,content_session_id:R.content_session_id,prompt_number:R.prompt_number,prompt_text:R.prompt_text,project:R.project,platform_source:R.platform_source,created_at:R.created_at,created_at_epoch:R.created_at_epoch}))}}getOrCreateManualSession(e,t=S){let s=N(t),r=`manual-${e}-${s}`,o=`manual-content-${e}-${s}`;if(this.db.prepare("SELECT memory_session_id FROM sdk_sessions WHERE memory_session_id = ?").get(r))return r;let a=new Date;return this.db.prepare(`
      INSERT INTO sdk_sessions (memory_session_id, content_session_id, project, platform_source, started_at, started_at_epoch, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `).run(r,o,e,s,a.toISOString(),a.getTime()),c.info("SESSION","Created manual session",{memorySessionId:r,project:e,platformSource:s}),r}close(){this.db.close()}importSdkSession(e){let t=N(e.platform_source),s=this.db.prepare(`SELECT id FROM sdk_sessions
       WHERE platform_source = ? AND content_session_id = ?`).get(t,e.content_session_id);if(s)return{imported:!1,id:s.id};let r=e.custom_title??null;if(r!==null&&typeof r!="string")throw new TypeError("Imported custom_title must be a string or null");let o=this.db.prepare(`
      INSERT INTO sdk_sessions (
        content_session_id, memory_session_id, project, platform_source, user_prompt, custom_title,
        started_at, started_at_epoch, completed_at, completed_at_epoch, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);return this.db.transaction(()=>({imported:!0,id:o.run(e.content_session_id,e.memory_session_id,e.project,t,e.user_prompt,r,e.started_at,e.started_at_epoch,e.completed_at,e.completed_at_epoch,e.status).lastInsertRowid}))()}importSessionSummary(e){if(typeof e?.memory_session_id!="string"||e.memory_session_id.trim()==="")return c.warn("DB","Skipping imported session summary without memory_session_id",{project:typeof e?.project=="string"?e.project:null}),{imported:!1,id:0};let t=this.db.prepare(`SELECT id FROM session_summaries WHERE memory_session_id = ?
        AND request IS ? AND investigated IS ? AND learned IS ? AND completed IS ?
        AND next_steps IS ? AND files_read IS ? AND files_edited IS ? AND notes IS ?
        AND prompt_number IS ? AND created_at_epoch = ?`).get(e.memory_session_id,f(e.request),f(e.investigated),f(e.learned),f(e.completed),f(e.next_steps),f(e.files_read),f(e.files_edited),f(e.notes),e.prompt_number??null,e.created_at_epoch);if(t)return{imported:!1,id:t.id};let r=this.db.prepare(`
      INSERT INTO session_summaries (
        memory_session_id, project, request, investigated, learned,
        completed, next_steps, files_read, files_edited, notes,
        prompt_number, discovery_tokens, created_at, created_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(e.memory_session_id,e.project,f(e.request),f(e.investigated),f(e.learned),f(e.completed),f(e.next_steps),f(e.files_read),f(e.files_edited),f(e.notes),e.prompt_number,e.discovery_tokens||0,e.created_at,e.created_at_epoch);return j({projects:[e.project]},"importSessionSummary"),{imported:!0,id:r.lastInsertRowid}}importObservation(e){if(typeof e?.memory_session_id!="string"||e.memory_session_id.trim()==="")return c.warn("DB","Skipping imported observation without memory_session_id",{title:typeof e?.title=="string"?e.title:null,type:typeof e?.type=="string"?e.type:null}),{imported:!1,id:0};let t=this.db.prepare(`
      SELECT id FROM observations
      WHERE memory_session_id = ? AND text IS ? AND type = ?
        AND title IS ? AND subtitle IS ? AND facts IS ? AND narrative IS ?
        AND concepts IS ? AND files_read IS ? AND files_modified IS ?
        AND prompt_number IS ? AND agent_type IS ?
        AND agent_id IS ? AND created_at_epoch = ?
    `).get(e.memory_session_id,f(e.text),e.type,f(e.title),f(e.subtitle),f(e.facts),f(e.narrative),f(e.concepts),f(e.files_read),f(e.files_modified),e.prompt_number??null,e.agent_type??null,e.agent_id??null,e.created_at_epoch);if(t)return{imported:!1,id:t.id};let s=this.db.prepare(`
      INSERT INTO observations (
        memory_session_id, project, text, type, title, subtitle,
        facts, narrative, concepts, files_read, files_modified,
        prompt_number, discovery_tokens, agent_type, agent_id,
        created_at, created_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `),r=this.db.transaction(()=>{let i=s.run(e.memory_session_id,e.project,f(e.text),e.type,f(e.title),f(e.subtitle),f(e.facts),f(e.narrative),f(e.concepts),f(e.files_read),f(e.files_modified),e.prompt_number,e.discovery_tokens||0,e.agent_type??null,e.agent_id??null,e.created_at,e.created_at_epoch).lastInsertRowid;return mt(this.db,i,e.files_read,e.files_modified),i})();return j({projects:[e.project]},"importObservation"),{imported:!0,id:r}}rebuildObservationsFTSIndex(){this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='observations_fts'").all().length>0&&this.db.run("INSERT INTO observations_fts(observations_fts) VALUES('rebuild')")}importUserPrompt(e){let t=null,s=e.platform_source?N(e.platform_source):void 0;if(typeof e.session_db_id=="number"){let a=this.db.prepare(`
        SELECT id, content_session_id, COALESCE(NULLIF(platform_source, ''), '${S}') as platform_source
        FROM sdk_sessions
        WHERE id = ?
        LIMIT 1
      `).get(e.session_db_id);a&&a.content_session_id===e.content_session_id&&(!s||N(a.platform_source)===s)&&(t=a.id)}t===null&&(t=this.resolvePromptSessionDbId(e.content_session_id,void 0,s));let r=this.db.prepare(`
      SELECT id FROM user_prompts
      WHERE ${t!==null?"session_db_id = ?":"content_session_id = ?"} AND prompt_number = ?
    `).get(t??e.content_session_id,e.prompt_number);return r?{imported:!1,id:r.id}:{imported:!0,id:this.db.prepare(`
      INSERT INTO user_prompts (
        session_db_id, content_session_id, prompt_number, prompt_text,
        created_at, created_at_epoch, native_prompt_id, native_prompt_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(t,e.content_session_id,e.prompt_number,f(e.prompt_text),e.created_at,e.created_at_epoch,e.native_prompt_id??null,e.native_prompt_hash??null).lastInsertRowid}}};0&&(module.exports={SessionStore,TELEGRAM_WRAPUP_CLAIM_STALE_AFTER_MS,rollupObservationFileLists});
//# sourceMappingURL=SessionStore.js.map
