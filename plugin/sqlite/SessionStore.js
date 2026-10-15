var __CM_FILENAME__ = typeof __filename !== "undefined" ? __filename : require("node:path").resolve(process.argv[1] || "");
var __CM_DIRNAME__ = typeof __dirname !== "undefined" ? __dirname : require("node:path").dirname(__CM_FILENAME__);
var __IMPORT_META_URL__ = require("node:url").pathToFileURL(__CM_FILENAME__).href;
"use strict";var Ne=Object.defineProperty;var _s=Object.getOwnPropertyDescriptor;var Es=Object.getOwnPropertyNames;var ds=Object.prototype.hasOwnProperty;var cs=(o,e)=>{for(var s in e)Ne(o,s,{get:e[s],enumerable:!0})},us=(o,e,s,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Es(e))!ds.call(o,n)&&n!==s&&Ne(o,n,{get:()=>e[n],enumerable:!(t=_s(e,n))||t.enumerable});return o};var ls=o=>us(Ne({},"__esModule",{value:!0}),o);var _n={};cs(_n,{SessionStore:()=>qe,TELEGRAM_WRAPUP_CLAIM_STALE_AFTER_MS:()=>is,rollupObservationFileLists:()=>as});module.exports=ls(_n);var ps=new Set;function $(o,e,s="additive"){for(let t of ps)t({scope:o,reason:e,kind:s})}var Ve=require("bun:sqlite"),os=require("crypto");var C=require("path"),Le=require("os"),ce=require("fs"),tt=require("url");var L=require("fs"),Je=require("crypto"),v=require("path");var ms=null;function Ts(o){return(ms??process.stderr.write.bind(process.stderr))(o)}function j(o){Ts(o)}var cn=Promise.resolve();var Ss=process.platform==="win32";function be(o){return o.replace(/^\uFEFF/,"")}function Ie(o){return JSON.parse(be(o))}function Q(o){return Ie((0,L.readFileSync)(o,"utf-8"))}function As(o){(0,L.existsSync)(o)||(0,L.mkdirSync)(o,{recursive:!0})}function k(o,e,s={}){let t=o,n=new Set;try{for(;(0,L.lstatSync)(t).isSymbolicLink();){let c=(0,v.resolve)(t);if(n.has(c))throw Object.assign(new Error(`Symlink loop at ${t}`),{code:"ELOOP"});n.add(c);try{t=(0,L.realpathSync)(t);break}catch(l){if(l.code!=="ENOENT")throw l;let m=l instanceof Error?l:new Error(String(l));j(`claude-mem: realpathSync failed for ${t}, resolving symlink manually: ${m.message}
`);let O=(0,L.readlinkSync)(t);t=(0,v.resolve)((0,v.dirname)(t),O)}}}catch(c){if(c.code!=="ENOENT")throw c}As((0,v.dirname)(t));let i=(0,v.dirname)(t),r=(0,v.basename)(t),a=(0,v.join)(i,`.${r}.${process.pid}.${(0,Je.randomBytes)(6).toString("hex")}.tmp`),_=Buffer.from(JSON.stringify(e,null,2)+`
`,"utf-8"),E=s.mode;if(E===void 0)try{E=(0,L.statSync)(t).mode&511}catch{}let d;try{d=E!==void 0?(0,L.openSync)(a,"w",E):(0,L.openSync)(a,"w");let c=0;for(;c<_.length;){let l=(0,L.writeSync)(d,_,c,_.length-c);if(l===0)throw new Error(`writeSync stalled at ${c}/${_.length} bytes`);c+=l}if((0,L.fsyncSync)(d),(0,L.closeSync)(d),d=void 0,(0,L.renameSync)(a,t),!Ss){let l;try{l=(0,L.openSync)(i,"r"),(0,L.fsyncSync)(l)}catch(m){let O=m instanceof Error?m:new Error(String(m));j(`claude-mem: directory fsync failed for ${i}: ${O.message}
`)}finally{if(l!==void 0)try{(0,L.closeSync)(l)}catch{}}}}catch(c){if(d!==void 0)try{(0,L.closeSync)(d)}catch{}try{(0,L.unlinkSync)(a)}catch{}throw c}}var gs=o=>o!==null&&typeof o=="object"&&!Array.isArray(o);function ze(o){let e=o.env;return gs(e)&&Object.keys(e).some(s=>s.startsWith("CLAUDE_MEM_"))?"nested":"flat"}function W(o){return ze(o)==="nested"?o.env:o}function Qe(o){return ze(o)!=="nested"?o:Object.fromEntries(Object.entries(o).filter(([e])=>!e.startsWith("CLAUDE_MEM_")))}var Ze=require("os"),et=require("path");function de(o,e=process.platform,s=(0,Ze.homedir)()){return typeof o!="string"||o.length===0?o:o==="~"?s:o.startsWith("~/")||e==="win32"&&o.startsWith("~\\")?(0,et.join)(s,o.slice(2)):o}function Os(){return typeof __CM_DIRNAME__<"u"?__CM_DIRNAME__:(0,C.dirname)((0,tt.fileURLToPath)(__IMPORT_META_URL__))}var Nn=Os();function fs(){if(process.env.CLAUDE_MEM_DATA_DIR)return de(process.env.CLAUDE_MEM_DATA_DIR);let o=(0,C.join)((0,Le.homedir)(),".claude-mem"),e=(0,C.join)(o,"settings.json");try{if((0,ce.existsSync)(e)){let s=Q(e);if(s===null||typeof s!="object"||Array.isArray(s))return o;let t=W(s);if(typeof t.CLAUDE_MEM_DATA_DIR=="string"&&t.CLAUDE_MEM_DATA_DIR)return de(t.CLAUDE_MEM_DATA_DIR)}}catch{}return o}var M=fs(),Rs=(0,C.join)((0,Le.homedir)(),".claude"),Ns=process.env.CLAUDE_CONFIG_DIR||Rs,bn=(0,C.join)(Ns,"plugins","marketplaces","thedotmack"),bs=(0,C.join)(M,"logs"),ue=(0,C.join)(M,"settings.json"),st="claude-mem.db";var le=(0,C.join)(M,st),Is=(0,C.join)(M,"observer-sessions"),Z=(0,C.basename)(Is);function pe(o){(0,ce.mkdirSync)(o,{recursive:!0})}var Ce={dataDir:()=>M,workerPid:()=>(0,C.join)(M,"worker.pid"),serverPid:()=>(0,C.join)(M,".server-beta.pid"),serverPort:()=>(0,C.join)(M,".server-beta.port"),serverRuntime:()=>(0,C.join)(M,".server-beta.runtime.json"),settings:()=>(0,C.join)(M,"settings.json"),database:()=>(0,C.join)(M,st),chroma:()=>(0,C.join)(M,"chroma"),combinedCerts:()=>(0,C.join)(M,"combined_certs.pem"),transcriptsConfig:()=>(0,C.join)(M,"transcript-watch.json"),transcriptsState:()=>(0,C.join)(M,"transcript-watch-state.json"),corpora:()=>(0,C.join)(M,"corpora"),supervisorRegistry:()=>(0,C.join)(M,"supervisor.json"),envFile:()=>(0,C.join)(M,".env"),logsDir:()=>bs};var B=require("fs"),nt=require("path");var De=(i=>(i[i.DEBUG=0]="DEBUG",i[i.INFO=1]="INFO",i[i.WARN=2]="WARN",i[i.ERROR=3]="ERROR",i[i.SILENT=4]="SILENT",i))(De||{}),he=null,Me=class{level=null;useColor;logFilePath=null;logFileInitialized=!1;logFileDate=null;constructor(){this.useColor=process.stdout.isTTY??!1}ensureLogFileInitialized(){let e=new Date().toISOString().split("T")[0];if(this.logFileInitialized&&this.logFileDate===e)return;let s=this.logFileDate!==e;this.logFileInitialized=!1,this.logFileDate=e;try{let t=Ce.logsDir();(0,B.existsSync)(t)||(0,B.mkdirSync)(t,{recursive:!0}),this.logFilePath=(0,nt.join)(t,`claude-mem-${e}.log`),this.logFileInitialized=!0}catch(t){s&&console.error("[LOGGER] Failed to initialize log file:",t instanceof Error?t.message:String(t)),this.logFilePath=null}}getLevel(){if(this.level===null)try{let e=Ce.settings();if((0,B.existsSync)(e)){let t=(W(Q(e)).CLAUDE_MEM_LOG_LEVEL||"INFO").toString().toUpperCase();this.level=De[t]??1}else this.level=1}catch(e){console.error("[LOGGER] Failed to load log level from settings:",e instanceof Error?e.message:String(e)),this.level=1}return this.level}safeStringify(e,s,t=6){let n=new WeakSet,i=(r,a)=>{if(typeof r=="bigint")return`${r}n`;if(r===null||typeof r!="object")return r;let _=r.toJSON,E=typeof _=="function"?_.call(r):r;if(typeof E=="bigint")return`${E}n`;if(E===null||typeof E!="object")return E;if(n.has(E))return"[Circular]";if(a>=t)return Array.isArray(E)?"[Array]":"[Object]";n.add(E);try{if(Array.isArray(E))return E.map(c=>i(c,a+1));let d={};for(let c of Object.keys(E))try{d[c]=i(E[c],a+1)}catch{d[c]="[unreadable]"}return d}finally{n.delete(E)}};try{return JSON.stringify(i(e,0),null,s)??String(e)}catch{return Array.isArray(e)?`[${e.length} items]`:"[unserializable]"}}formatData(e){if(e==null)return"";if(typeof e=="string")return e;if(typeof e=="number"||typeof e=="boolean")return e.toString();if(typeof e=="object"){if(e instanceof Error)return this.getLevel()===0?`${e.message}
${e.stack}`:e.message;if(Array.isArray(e))return`[${e.length} items]`;let s=Object.keys(e);return s.length===0?"{}":s.length<=3?this.safeStringify(e):`{${s.length} keys: ${s.slice(0,3).join(", ")}...}`}return String(e)}formatTool(e,s){if(!s)return e;let t=s;if(typeof s=="string")try{t=JSON.parse(s)}catch{t=s}if(t===null)return e;if(e==="Bash"&&t.command)return`${e}(${t.command})`;if(t.file_path)return`${e}(${t.file_path})`;if(t.notebook_path)return`${e}(${t.notebook_path})`;if(e==="Glob"&&t.pattern)return`${e}(${t.pattern})`;if(e==="Grep"&&t.pattern)return`${e}(${t.pattern})`;if(t.url)return`${e}(${t.url})`;if(t.query)return`${e}(${t.query})`;if(e==="Task"){if(t.subagent_type)return`${e}(${t.subagent_type})`;if(t.description)return`${e}(${t.description})`}return e==="Skill"&&t.skill?`${e}(${t.skill})`:e==="LSP"&&t.operation?`${e}(${t.operation})`:e}formatTimestamp(e){let s=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0"),i=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0"),a=String(e.getSeconds()).padStart(2,"0"),_=String(e.getMilliseconds()).padStart(3,"0");return`${s}-${t}-${n} ${i}:${r}:${a}.${_}`}log(e,s,t,n,i){if(e<this.getLevel())return;this.ensureLogFileInitialized();let r=this.formatTimestamp(new Date),a=De[e].padEnd(5),_=s.padEnd(6),E="";n?.correlationId?E=`[${n.correlationId}] `:n?.sessionId&&(E=`[session-${n.sessionId}] `);let d="";i!=null&&(i instanceof Error?d=this.getLevel()===0?`
${i.message}
${i.stack}`:` ${i.message}`:this.getLevel()===0&&typeof i=="object"?d=`
`+this.safeStringify(i,2):d=" "+this.formatData(i));let c="";if(n){let{sessionId:m,memorySessionId:O,correlationId:h,...f}=n;Object.keys(f).length>0&&(c=` {${Object.entries(f).map(([R,p])=>typeof p!="object"||p===null||p instanceof Error||p instanceof Date?`${R}=${p}`:`${R}=${Array.isArray(p)?this.safeStringify(p):this.formatData(p)}`).join(", ")}}`)}let l=`[${r}] [${a}] [${_}] ${E}${t}${c}${d}`;if(this.logFilePath)try{(0,B.appendFileSync)(this.logFilePath,l+`
`,"utf8")}catch(m){let O=m instanceof Error?m:new Error(String(m));j(`[LOGGER] Failed to write to log file: ${O.message}
${O.stack??""}
`)}else j(l+`
`)}debug(e,s,t,n){this.log(0,e,s,t,n)}info(e,s,t,n){this.log(1,e,s,t,n)}warn(e,s,t,n){this.log(2,e,s,t,n)}setErrorSink(e){he=e}error(e,s,t,n){this.log(3,e,s,t,n),this.routeErrorToSink(s,t,n)}routeErrorToSink(e,s,t){try{if(!he||!(t instanceof Error))return;he(t)}catch{}}dataIn(e,s,t,n){this.info(e,`\u2192 ${s}`,t,n)}dataOut(e,s,t,n){this.info(e,`\u2190 ${s}`,t,n)}success(e,s,t,n){this.info(e,`\u2713 ${s}`,t,n)}failure(e,s,t,n){this.error(e,`\u2717 ${s}`,t,n)}},u=new Me;function F(o){let e=o.projects?.length?o.projects:o.project?[o.project]:[];return[...new Set(e.map(s=>s.trim()).filter(Boolean))]}function w(o,e,s){let t=e.map(()=>"?").join(",");return s.includeMerged?{sql:`(${o}.project COLLATE NOCASE IN (${t}) OR ${o}.merged_into_project COLLATE NOCASE IN (${t}))`,params:[...e,...e]}:{sql:`${o}.project COLLATE NOCASE IN (${t})`,params:[...e]}}function rt(o,e){let s=F({projects:e});if(s.length===0)return[];let t=s.map(()=>"?").join(","),n=[`SELECT project AS key FROM sdk_sessions WHERE project COLLATE NOCASE IN (${t})`,`SELECT project FROM observations WHERE project COLLATE NOCASE IN (${t})`,`SELECT merged_into_project FROM observations WHERE merged_into_project COLLATE NOCASE IN (${t})`,`SELECT project FROM session_summaries WHERE project COLLATE NOCASE IN (${t})`,`SELECT merged_into_project FROM session_summaries WHERE merged_into_project COLLATE NOCASE IN (${t})`,`SELECT project FROM observations WHERE merged_into_project COLLATE NOCASE IN (${t})`,`SELECT project FROM session_summaries WHERE merged_into_project COLLATE NOCASE IN (${t})`],i=o.prepare(n.join(" UNION "));try{let r=i.all(...n.flatMap(()=>s));return[...new Set([...s,...r.map(a=>a.key)])]}finally{i.finalize()}}var ot=require("crypto");function ye(o){return typeof o=="string"&&o.trim()!==""}function it(o,e,s){return(0,ot.createHash)("sha256").update([o||"",e||"",s||""].join("\0")).digest("hex").slice(0,16)}function at(o){if(!o)return[];try{let e=JSON.parse(o);return Array.isArray(e)?e.filter(s=>typeof s=="string"&&s.length>0):[]}catch{return[]}}function Ue(o=new Date){return o.toISOString().slice(0,10)}function _t(o,e=new Date,s=10){let t=Ue(e);if(o.includes(t))return o;let n=[...o,t];return n.length>s?n.slice(n.length-s):n}function Et(o){let e=Ue(new Date(o));return{dates:JSON.stringify([e]),lastReinforced:e}}function me(o,e,s=new Date){let t=o.prepare("SELECT reinforcement_dates FROM observations WHERE id = ?").get(e);if(!t)return!1;let n=at(t.reinforcement_dates),i=_t(n,s);return i===n?!1:(o.prepare("UPDATE observations SET reinforcement_dates = ?, last_reinforced = ? WHERE id = ?").run(JSON.stringify(i),i[i.length-1],e),!0)}var ut=require("crypto");var T="claude";function Ls(o){return o.trim().toLowerCase().replace(/\s+/g,"-")}function N(o){if(!o)return T;let e=Ls(o);return e?e==="transcript"||e.includes("codex")?"codex":e.includes("cursor")?"cursor":e.includes("claude")?"claude":e.includes("kimi")?"kimi":e==="pi-mono"?"pi":e==="agy"||e==="antigravity"||e.startsWith("antigravity-")?"antigravity-cli":e:T}function dt(o){let e=["claude","codex","antigravity-cli","cursor","kimi"];return[...o].sort((s,t)=>{let n=e.indexOf(s),i=e.indexOf(t);return n!==-1||i!==-1?n===-1?1:i===-1?-1:n-i:s.localeCompare(t)})}var Cs=new Set(["mem_search","search","timeline","get_observations","get_summaries","get_tool_uses","session_start_context","observation_search","observation_context","memory_search","memory_context"]);function hs(o){if(!o.startsWith("mcp__"))return null;let e=o.split("__");if(e.length<3)return null;let s=e[1].toLowerCase();return!s.includes("claude-mem")&&!s.includes("claude_mem")&&!s.includes("mcp-search")&&!s.includes("mcp_search")&&!s.includes("cmem")?null:e.slice(2).join("__")}function ve(o){if(!o)return!1;if(o.startsWith("memory_")||o==="mem_search"||o==="get_summaries")return!0;let e=hs(o);return e!==null&&Cs.has(e)}var Ds=64*1024;function ct(o,e=Ds){let s=Buffer.byteLength(o,"utf8");if(s<=e)return o;let t=Buffer.from(o,"utf8"),n=e;for(;n>0&&(t[n]&192)===128;)n--;return`${t.subarray(0,n).toString("utf8")}\u2026[truncated: ${s} bytes]`}function Ms(o,e,s){return(0,ut.createHash)("sha256").update([o||"",e||"",s||""].join("\0")).digest("hex").slice(0,16)}function lt(o){o.run(`
    CREATE TABLE IF NOT EXISTS tool_uses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tool_use_id TEXT NOT NULL,
      content_session_id TEXT NOT NULL,
      memory_session_id TEXT,
      session_db_id INTEGER,
      project TEXT NOT NULL,
      platform_source TEXT NOT NULL DEFAULT '${T}',
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
  `),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_project ON tool_uses(project)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_project_nocase_created ON tool_uses(project COLLATE NOCASE, created_at_epoch DESC, id DESC)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_memory_session ON tool_uses(memory_session_id)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_content_session ON tool_uses(content_session_id)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_session_db_id ON tool_uses(session_db_id)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_tool_name ON tool_uses(tool_name)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_created_at_epoch ON tool_uses(created_at_epoch)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_observation_id ON tool_uses(observation_id)"),o.run("CREATE INDEX IF NOT EXISTS idx_tool_uses_or_generation_id ON tool_uses(or_generation_id)")}function pt(o,e){if(!e.toolUseId||!e.contentSessionId||!e.toolName||ve(e.toolName))return null;let s=e.createdAtEpoch??Date.now(),t=new Date(s).toISOString(),n=Ms(e.toolName,e.toolInput,e.toolResponse),i=e.toolInput!=null?ct(e.toolInput):null,r=e.toolResponse!=null?ct(e.toolResponse):null,a=o.prepare(`
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
  `).get(e.toolUseId,e.contentSessionId,e.memorySessionId??null,e.sessionDbId??null,e.project??"",N(e.platformSource),e.toolName,i,r,e.cwd??null,e.promptNumber??null,e.agentType??null,e.agentId??null,e.orGenerationId??null,e.orSessionId??null,n,t,s);return a?a.id:null}function mt(o,e){let s=e.toolUseIds.filter(i=>typeof i=="string"&&i.length>0);if(s.length===0)return 0;let t=s.map(()=>"?").join(","),n=o.prepare(`
    UPDATE tool_uses
    SET observation_id = COALESCE(observation_id, ?),
        memory_session_id = CASE WHEN observation_id IS NULL
          THEN COALESCE(?, memory_session_id)
          ELSE COALESCE(memory_session_id, ?)
        END
    WHERE content_session_id = ?
      AND tool_use_id IN (${t})
      AND (observation_id IS NULL OR observation_id = ?)
  `).run(e.observationId,e.memorySessionId??null,e.memorySessionId??null,e.contentSessionId,...s,e.observationId);return Number(n.changes??0)}function Tt(o){return o?{clause:`COALESCE(NULLIF(platform_source, ''), '${T}') = ?`,param:N(o)}:null}function St(o,e,s={}){let t=[],n=[];for(let d of e){if(typeof d=="number"&&Number.isInteger(d)){t.push(d);continue}if(typeof d=="string"&&d.trim().length>0){let c=Number(d);Number.isInteger(c)&&String(c)===d.trim()&&t.push(c),n.push(d.trim())}}if(t.length===0&&n.length===0)return[];let i=[],r=[];t.length>0&&(i.push(`id IN (${t.map(()=>"?").join(",")})`),r.push(...t)),n.length>0&&(i.push(`tool_use_id IN (${n.map(()=>"?").join(",")})`),r.push(...n));let a=[`(${i.join(" OR ")})`];s.project&&(a.push("project COLLATE NOCASE = ?"),r.push(s.project)),s.contentSessionId&&(a.push("content_session_id = ?"),r.push(s.contentSessionId));let _=Tt(s.platformSource);_&&(a.push(_.clause),r.push(_.param));let E=s.limit&&s.limit>0?`LIMIT ${Math.floor(s.limit)}`:"";return o.prepare(`
    SELECT * FROM tool_uses
    WHERE ${a.join(" AND ")}
    ORDER BY created_at_epoch DESC
    ${E}
  `).all(...r)}function At(o,e={}){let s=[],t=[];if(e.project&&(s.push("project COLLATE NOCASE = ?"),t.push(e.project)),e.contentSessionId&&(s.push("content_session_id = ?"),t.push(e.contentSessionId)),e.memorySessionId&&(s.push("memory_session_id = ?"),t.push(e.memorySessionId)),typeof e.sessionDbId=="number"&&(s.push("session_db_id = ?"),t.push(e.sessionDbId)),e.toolName){let E=Array.isArray(e.toolName)?e.toolName:[e.toolName];E.length>0&&(s.push(`tool_name IN (${E.map(()=>"?").join(",")})`),t.push(...E))}e.agentId&&(s.push("agent_id = ?"),t.push(e.agentId));let n=Tt(e.platformSource);n&&(s.push(n.clause),t.push(n.param)),typeof e.dateStart=="number"&&(s.push("created_at_epoch >= ?"),t.push(e.dateStart)),typeof e.dateEnd=="number"&&(s.push("created_at_epoch <= ?"),t.push(e.dateEnd));let i=s.length>0?`WHERE ${s.join(" AND ")}`:"",r=e.orderBy==="date_asc"?"ASC":"DESC",a=Math.min(Math.max(Math.floor(e.limit??50),1),500),_=Math.max(Math.floor(e.offset??0),0);return o.prepare(`
    SELECT * FROM tool_uses
    ${i}
    ORDER BY created_at_epoch ${r}, id ${r}
    LIMIT ${a} OFFSET ${_}
  `).all(...t)}function gt(o,e={}){let s=[],t=[];e.project&&(s.push("project COLLATE NOCASE = ?"),t.push(e.project)),e.contentSessionId&&(s.push("content_session_id = ?"),t.push(e.contentSessionId)),e.agentId&&(s.push("agent_id = ?"),t.push(e.agentId)),typeof e.dateStart=="number"&&(s.push("created_at_epoch >= ?"),t.push(e.dateStart)),typeof e.dateEnd=="number"&&(s.push("created_at_epoch <= ?"),t.push(e.dateEnd));let n=s.length>0?`WHERE ${s.join(" AND ")}`:"";return o.prepare(`
    SELECT tool_name, COUNT(DISTINCT tool_use_id) AS uses
    FROM tool_uses
    ${n}
    GROUP BY tool_name
    ORDER BY uses DESC, tool_name ASC
  `).all(...t)}function Ot(o){o.run(`
    CREATE TABLE IF NOT EXISTS work_state_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project TEXT NOT NULL,
      list_name TEXT NOT NULL,
      fields TEXT NOT NULL,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL
    )
  `),o.run("CREATE INDEX IF NOT EXISTS idx_work_state_entries_project ON work_state_entries(project COLLATE NOCASE, list_name, id)")}function ft(o,e){let s=e.createdAtEpoch??Date.now(),t=o.prepare(`
    INSERT INTO work_state_entries (project, list_name, fields, created_at, created_at_epoch)
    VALUES (?, ?, ?, ?, ?)
  `).run(e.project,e.listName,JSON.stringify(e.fields),new Date(s).toISOString(),s),n=Number(t.lastInsertRowid);return u.debug("DB","Work state entry appended",{id:n,project:e.project,listName:e.listName}),n}function Rt(o,e,s){if(e.length===0)return[];let t=e.map(()=>"?").join(", "),n=s===void 0?"":" AND list_name = ?";return o.prepare(`
    SELECT id, project, list_name, fields, created_at_epoch
    FROM work_state_entries
    WHERE project COLLATE NOCASE IN (${t})${n}
    ORDER BY id
  `).all(...e,...s===void 0?[]:[s]).map(r=>({...r,fields:JSON.parse(r.fields)}))}var X=require("fs"),P=require("path"),we=require("os");var Te={HEALTH_CHECK:3e3,API_REQUEST:3e4,SESSION_INIT_HOOK_CAP:15e3,SESSION_INIT_REQUEST:1e4,SESSION_INIT_REQUEST_MAX:14e3,HOOK_READINESS_WAIT:1e4,POST_SPAWN_WAIT:15e3,READINESS_WAIT:3e4,PORT_IN_USE_WAIT:3e3,POWERSHELL_COMMAND:1e4,WINDOWS_MULTIPLIER:1.5};function ys(o=process.platform){return o==="win32"?8e3:5e3}function Nt(o=process.platform){return Te.SESSION_INIT_HOOK_CAP-ys(o)}function bt(o){return process.platform==="win32"?Math.round(o*Te.WINDOWS_MULTIPLIER):o}function It(o){try{return new URL(o).hostname.toLowerCase()==="openrouter.ai"}catch{return!1}}var Us="security_alert",vs=new Set(["xiaomi/mimo-v2-flash:free"]);function Fs(o){return typeof o=="boolean"?String(o):o}function ws(o){let e=o.CLAUDE_MEM_OPENROUTER_MODEL;if(typeof e!="string"||!vs.has(e.trim()))return!1;let s=typeof o.CLAUDE_MEM_OPENROUTER_BASE_URL=="string"?o.CLAUDE_MEM_OPENROUTER_BASE_URL.trim():"";return s===""||It(s)}var Lt=18e4,Ct=[{key:"CLAUDE_MEM_LLM_TIMEOUT_MS",legacy:"30000",markerTag:"llm-timeout-migrated-v1"},{key:"CLAUDE_MEM_FIELD_OPTIMIZE_TIMEOUT_MS",legacy:"30000",markerTag:"field-optimize-timeout-migrated-v1"}];function Dt(o,e){return(0,P.join)((0,P.dirname)(o),`.${(0,P.basename)(o)}.${e.markerTag}`)}function Fe(o,e){try{(0,X.writeFileSync)(Dt(o,e),new Date().toISOString(),{encoding:"utf-8",mode:384})}catch{}}var ht=new Set,K=class{static DEFAULTS={CLAUDE_MEM_MEMORY_SEARCH_HOOK_ENABLED:"true",CLAUDE_MEM_MEMORY_INSTRUCTIONS_ENABLED:"true",CLAUDE_MEM_MEMORY_WATCH_ROOTS:"",CLAUDE_MEM_MODEL:"claude-haiku-4-5-20251001",CLAUDE_MEM_CONTEXT_OBSERVATIONS:"25",CLAUDE_MEM_SESSION_START_INCLUDE_ALL_SOURCES:"false",CLAUDE_MEM_WORKER_PORT:String(37700+(process.getuid?.()??77)%100),CLAUDE_MEM_WORKER_HOST:"127.0.0.1",CLAUDE_MEM_ALLOWED_ORIGINS:"",CLAUDE_MEM_PUBLIC_URL:"",CLAUDE_MEM_API_TIMEOUT_MS:String(bt(Te.API_REQUEST)),CLAUDE_MEM_SESSION_INIT_TIMEOUT_MS:String(Nt()),CLAUDE_MEM_IDLE_EXIT_SEC:"0",CLAUDE_MEM_SKIP_TOOLS:"ListMcpResourcesTool,SlashCommand,Skill,TodoWrite,AskUserQuestion",CLAUDE_MEM_SKIP_BASH_PATTERNS:"",CLAUDE_MEM_SKIP_SUBAGENT_OBSERVATIONS:"false",CLAUDE_MEM_SKIP_AGENT_TYPES:"",CLAUDE_MEM_CAPTURE_ADVISOR_CALLS:"false",CLAUDE_MEM_PROVIDER:"claude",CLAUDE_MEM_CODEX_MODEL:"",CLAUDE_MEM_CODEX_PATH:"codex",CLAUDE_MEM_CODEX_REASONING_EFFORT:"low",CLAUDE_MEM_CODEX_MAX_CONCURRENT_AGENTS:"2",CLAUDE_MEM_CODEX_OBSERVATION_BATCH_SIZE:"8",CLAUDE_MEM_CODEX_OBSERVATION_BATCH_MAX_CHARS:"32000",CLAUDE_MEM_CLAUDE_AUTH_METHOD:"subscription",CLAUDE_MEM_GEMINI_API_KEY:"",CLAUDE_MEM_GEMINI_API_KEYS:"",CLAUDE_MEM_GEMINI_MODEL:"gemini-flash-latest",CLAUDE_MEM_GEMINI_RATE_LIMITING_ENABLED:"true",CLAUDE_MEM_OPENROUTER_API_KEY:"",CLAUDE_MEM_OPENROUTER_API_KEYS:"",CLAUDE_MEM_OPENROUTER_MODEL:"cohere/north-mini-code:free",CLAUDE_MEM_OPENROUTER_BASE_URL:"",CLAUDE_MEM_OPENROUTER_TEMPERATURE:"",CLAUDE_MEM_OPENROUTER_SITE_URL:"",CLAUDE_MEM_OPENROUTER_APP_NAME:"claude-mem",CLAUDE_MEM_OPENROUTER_EXTRA_BODY:"",CLAUDE_MEM_OPENROUTER_REASONING_EFFORT:"",CLAUDE_MEM_OPENAI_COMPAT_PRESET:"",CLAUDE_MEM_OPENAI_COMPAT_API_KEY:"",CLAUDE_MEM_OPENAI_COMPAT_API_KEYS:"",CLAUDE_MEM_OPENAI_COMPAT_BASE_URL:"",CLAUDE_MEM_OPENAI_COMPAT_MODEL:"",CLAUDE_MEM_QUOTA_FALLBACK_PROVIDER:"claude",CLAUDE_MEM_QUOTA_FALLBACK_MODEL:"",CLAUDE_MEM_QUOTA_THRESHOLD_FIVE_HOUR:"0.95",CLAUDE_MEM_QUOTA_THRESHOLD_SEVEN_DAY:"0.93",CLAUDE_MEM_QUOTA_THRESHOLD_SEVEN_DAY_OPUS:"0.93",CLAUDE_MEM_QUOTA_THRESHOLD_SEVEN_DAY_SONNET:"0.92",CLAUDE_MEM_QUOTA_THRESHOLD_OVERAGE:"0.95",CLAUDE_MEM_DATA_DIR:(0,P.join)((0,we.homedir)(),".claude-mem"),CLAUDE_MEM_LOG_LEVEL:"INFO",CLAUDE_MEM_PYTHON_VERSION:"3.13",CLAUDE_CODE_PATH:"",CLAUDE_MEM_CLAUDE_CONFIG_DIR:"",CLAUDE_MEM_OBSERVER_CLAUDE_CONFIG_DIR:"",CLAUDE_MEM_MODE:"code",CLAUDE_MEM_CONTEXT_SHOW_READ_TOKENS:"false",CLAUDE_MEM_CONTEXT_SHOW_WORK_TOKENS:"false",CLAUDE_MEM_CONTEXT_OBSERVATION_TYPES:"",CLAUDE_MEM_CONTEXT_OBSERVATION_CONCEPTS:"",CLAUDE_MEM_CONTEXT_FULL_COUNT:"0",CLAUDE_MEM_CONTEXT_FULL_FIELD:"narrative",CLAUDE_MEM_CONTEXT_SESSION_COUNT:"5",CLAUDE_MEM_CONTEXT_SHOW_LAST_SUMMARY:"true",CLAUDE_MEM_CONTEXT_SHOW_LAST_MESSAGE:"false",CLAUDE_MEM_CONTEXT_MAIN_AGENT_ONLY:"true",CLAUDE_MEM_REINFORCE_ALPHA:"0",CLAUDE_MEM_CONTEXT_SHOW_TERMINAL_OUTPUT:"true",CLAUDE_MEM_WELCOME_HINT_ENABLED:"false",CLAUDE_MEM_WORK_STATE_ENABLED:"true",CLAUDE_MEM_FILE_READ_GATE_ENABLED:"true",CLAUDE_MEM_FOLDER_CLAUDEMD_ENABLED:"false",CLAUDE_MEM_FOLDER_USE_LOCAL_MD:"false",CLAUDE_MEM_TRANSCRIPTS_ENABLED:"true",CLAUDE_MEM_TRANSCRIPTS_CONFIG_PATH:(0,P.join)((0,we.homedir)(),".claude-mem","transcript-watch.json"),CLAUDE_MEM_CODEX_TRANSCRIPT_INGESTION:"false",CLAUDE_MEM_CODEX_SUBAGENT_INGESTION:"false",CLAUDE_MEM_MAX_CONCURRENT_AGENTS:"2",CLAUDE_MEM_OBSERVER_MAX_CONVERSATION_CHARS:"400000",CLAUDE_MEM_OBSERVER_THINKING:"disabled",CLAUDE_MEM_OBSERVER_CONTEXT_WINDOW:"",CLAUDE_MEM_OBSERVER_MAX_OUTPUT_TOKENS:"4096",CLAUDE_MEM_OBSERVE_BARE_PROMPTS:"false",CLAUDE_MEM_HOOK_FAIL_LOUD_THRESHOLD:"3",CLAUDE_MEM_REDACT_ENABLED:"false",CLAUDE_MEM_REDACT_DISABLED_BUILTINS:"",CLAUDE_MEM_REDACT_CUSTOM_PATTERNS:"[]",CLAUDE_MEM_REDACT_LOG_MATCHES:"false",CLAUDE_MEM_EXCLUDED_PROJECTS:"",CLAUDE_MEM_PROJECT_ENVIRONMENTS:"[]",CLAUDE_MEM_FOLDER_MD_EXCLUDE:"[]",CLAUDE_MEM_FOLDER_MD_SKELETON_DENYLIST:"[]",CLAUDE_MEM_SEMANTIC_INJECT:"false",CLAUDE_MEM_SEMANTIC_INJECT_LIMIT:"5",CLAUDE_MEM_SEMANTIC_INJECT_FORMAT:"narrative",CLAUDE_MEM_TIER_ROUTING_ENABLED:"true",CLAUDE_MEM_TIER_SIMPLE_MODEL:"haiku",CLAUDE_MEM_TIER_SUMMARY_MODEL:"",CLAUDE_MEM_TIER_FAST_MODEL:"haiku",CLAUDE_MEM_TIER_SMART_MODEL:"sonnet",CLAUDE_MEM_CHROMA_ENABLED:"true",CLAUDE_MEM_CHROMA_MODE:"local",CLAUDE_MEM_CHROMA_HOST:"127.0.0.1",CLAUDE_MEM_CHROMA_PORT:"8000",CLAUDE_MEM_CHROMA_SSL:"false",CLAUDE_MEM_CHROMA_API_KEY:"",CLAUDE_MEM_CHROMA_TENANT:"default_tenant",CLAUDE_MEM_CHROMA_DATABASE:"default_database",CLAUDE_MEM_CHROMA_PREWARM_TIMEOUT_MS:"120000",CLAUDE_MEM_CHROMA_MUTATION_TIMEOUT_MS:"600000",CLAUDE_MEM_CHROMA_MAX_PENDING_MUTATIONS:"5000",CLAUDE_MEM_CHROMA_EMBEDDING_FUNCTION:"default",CLAUDE_MEM_CHROMA_UVX_PATH:"",CLAUDE_MEM_LLM_TIMEOUT_MS:String(Lt),CLAUDE_MEM_FIELD_OPTIMIZE_TIMEOUT_MS:String(Lt),CLAUDE_MEM_LLM_STREAM_IDLE_TIMEOUT_MS:"90000",CLAUDE_MEM_TV_TOKEN:"",CLAUDE_MEM_PRO_TRIAL_EMAIL:"",CLAUDE_MEM_PRO_TRIAL_AT:"",CLAUDE_MEM_PRO_TRIAL_STATE:"",CLAUDE_MEM_PRO_TRIAL_ENDS_AT:"",CLAUDE_MEM_PRO_PLAN:"",CLAUDE_MEM_PRO_FALLBACK_AT:"",CLAUDE_MEM_PRO_FALLBACK_MESSAGE:"",CLAUDE_MEM_PRO_FALLBACK_ACTION:"",CLAUDE_MEM_PRO_FALLBACK_URL:"",CLAUDE_MEM_PRO_MEMORY_KEY:"",CLAUDE_MEM_PRO_MEMORY_BASE_URL:"",CLAUDE_MEM_PRO_MEMORY_MODEL:"",CLAUDE_MEM_TELEGRAM_ENABLED:"true",CLAUDE_MEM_TELEGRAM_BOT_TOKEN:"",CLAUDE_MEM_TELEGRAM_CHAT_ID:"",CLAUDE_MEM_TELEGRAM_WRAPUPS_ENABLED:"true",CLAUDE_MEM_TELEGRAM_OBSERVATION_ALERTS_ENABLED:"false",CLAUDE_MEM_TELEGRAM_WRAPUP_ROUTES:"{}",CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES:"security_alert,sensitive",CLAUDE_MEM_TELEGRAM_TRIGGER_CONCEPTS:"",CLAUDE_MEM_GROK_BOT_AWARENESS_ENABLED:"true",CLAUDE_MEM_GROK_BOT_AWARENESS_AGENT_IDS:"521e962d-2ec3-4488-bfbc-54d5209ce118,95601360-61f7-4fd9-bb3a-2c976b2b85c0",CLAUDE_MEM_GROK_BOT_AWARENESS_TRIGGER_TYPES:"decision,bugfix,security_alert,sensitive",CLAUDE_MEM_GROK_BOT_AWARENESS_TRIGGER_CONCEPTS:"",CLAUDE_MEM_GROK_BOT_WEBHOOK_URL:"",CLAUDE_MEM_GROK_BOT_WEBHOOK_SECRET:"",CLAUDE_MEM_GROK_BOT_INJECT_ENABLED:"true",CLAUDE_MEM_GROK_BOT_INJECT_AGENT_IDS:"*",CLAUDE_MEM_GROK_BOT_INJECT_TIER:"episode",CLAUDE_MEM_GROK_BOT_INJECT_WINDOW:"80",CLAUDE_MEM_GROK_BOT_INJECT_FALLBACK:"house",CLAUDE_MEM_GROK_BOT_INJECT_PLATFORM_SOURCE:"",CLAUDE_MEM_GROK_BOT_INJECT_PROJECTS_BY_AGENT:"",CLAUDE_MEM_GROK_BOT_INJECT_MAX_LINE_CHARS:"160",CLAUDE_MEM_GROK_BOT_INJECT_DEBOUNCE_MS:"1500",CLAUDE_MEM_GROK_BOT_INJECT_STANDING_LINE:"",CLAUDE_MEM_CCS_ALIGN_ENABLED:"true",CLAUDE_MEM_CCS_ALIGN_VIEWER_IDS:"ccs-align",CLAUDE_MEM_CCS_ALIGN_TRIGGER_TYPES:"decision,bugfix,security_alert,sensitive",CLAUDE_MEM_CCS_ALIGN_PATCH_SHADOWS:"false",CLAUDE_MEM_QUEUE_ENGINE:"sqlite",CLAUDE_MEM_REDIS_URL:"",CLAUDE_MEM_REDIS_HOST:"127.0.0.1",CLAUDE_MEM_REDIS_PORT:"6379",CLAUDE_MEM_REDIS_MODE:"external",CLAUDE_MEM_QUEUE_REDIS_PREFIX:`claude_mem_${process.env.CLAUDE_MEM_WORKER_PORT??String(37700+(process.getuid?.()??77)%100)}`,CLAUDE_MEM_AUTH_MODE:"api-key",CLAUDE_MEM_RUNTIME:"worker",CLAUDE_MEM_SERVER_URL:`http://127.0.0.1:${process.env.CLAUDE_MEM_SERVER_PORT??String(37877+(process.getuid?.()??77)%100)}`,CLAUDE_MEM_SERVER_API_KEY:"",CLAUDE_MEM_SERVER_PROJECT_ID:"",CLAUDE_MEM_SERVER_BETA_URL:`http://127.0.0.1:${process.env.CLAUDE_MEM_SERVER_PORT??String(37877+(process.getuid?.()??77)%100)}`,CLAUDE_MEM_SERVER_BETA_API_KEY:"",CLAUDE_MEM_SERVER_BETA_PROJECT_ID:"",CLAUDE_MEM_DEDUP_ENABLED:"false",CLAUDE_MEM_DEDUP_COSINE_THRESHOLD:"0.80",CLAUDE_MEM_DEDUP_IDF_VETO_DF:"10",CLAUDE_MEM_DEDUP_MIN_SHARED_TOKENS:"2",CLAUDE_MEM_DEDUP_MIN_PROJECT_DOCS:"10",CLAUDE_MEM_DEDUP_MAX_SCAN:"2000",CLAUDE_MEM_DEDUP_MAX_BACKFILL_ROWS:"50000",CLAUDE_MEM_TOOL_USES_RETENTION_DAYS:"0",CLAUDE_MEM_WORKER_AUTOSTART:"true",CLAUDE_MEM_PROJECT_NAME_SOURCE:"path"};static getAllDefaults(){return{...this.DEFAULTS}}static get(e){let s=process.env[e]??this.DEFAULTS[e];return e==="CLAUDE_MEM_WORKER_HOST"?this.normalizeWorkerHost(s):s}static normalizeWorkerHost(e){return e==="localhost"?"127.0.0.1":e}static finalizeSettings(e,s){let t=s?this.applyEnvOverrides(e):e;return t.CLAUDE_MEM_WORKER_HOST=this.normalizeWorkerHost(t.CLAUDE_MEM_WORKER_HOST),t}static getInt(e){let s=this.get(e);return parseInt(s,10)}static applyEnvOverrides(e){let s={...e};for(let t of Object.keys(this.DEFAULTS))process.env[t]!==void 0&&(s[t]=process.env[t]);return s}static loadFromFile(e,s=!0,t={}){try{if(!(0,X.existsSync)(e)){let c=this.getAllDefaults();if(!t.readOnly)try{k(e,c,{mode:384});for(let l of Ct)Fe(e,l);console.warn("[SETTINGS] Created settings file with defaults:",e)}catch(l){console.warn("[SETTINGS] Failed to create settings file, using in-memory defaults:",e,l instanceof Error?l.message:String(l))}return this.finalizeSettings(c,s)}let n=(0,X.readFileSync)(e,"utf-8"),i=Ie(n),r=W(i),a=r!==i,_=Qe(i),E=a&&Object.keys(_).some(c=>c!=="env");if(a&&!E&&!t.readOnly)try{k(e,r,{mode:384}),console.warn("[SETTINGS] Migrated settings file from nested to flat schema:",e)}catch(c){console.warn("[SETTINGS] Failed to auto-migrate settings file:",e,c instanceof Error?c.message:String(c))}if(r.CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES===Us&&(r={...r,CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES:this.DEFAULTS.CLAUDE_MEM_TELEGRAM_TRIGGER_TYPES},!t.readOnly))try{k(e,E?{..._,env:r}:r,{mode:384}),console.warn("[SETTINGS] Migrated Telegram trigger types off the legacy default:",e)}catch(c){console.warn("[SETTINGS] Failed to migrate Telegram trigger types:",e,c instanceof Error?c.message:String(c))}if(ws(r)){let c=String(r.CLAUDE_MEM_OPENROUTER_MODEL).trim();if(r={...r,CLAUDE_MEM_OPENROUTER_MODEL:this.DEFAULTS.CLAUDE_MEM_OPENROUTER_MODEL},!t.readOnly)try{k(e,E?{..._,env:r}:r,{mode:384}),console.warn(`[SETTINGS] Migrated OpenRouter model off the retired default ${c} to ${this.DEFAULTS.CLAUDE_MEM_OPENROUTER_MODEL}:`,e)}catch(l){console.warn("[SETTINGS] Failed to migrate the retired OpenRouter model:",e,l instanceof Error?l.message:String(l))}}for(let c of Ct)if(!(0,X.existsSync)(Dt(e,c))){if(r[c.key]!==c.legacy){t.readOnly||Fe(e,c);continue}if(r={...r,[c.key]:this.DEFAULTS[c.key]},!t.readOnly)try{k(e,E?{..._,env:r}:r,{mode:384}),Fe(e,c),console.warn(`[SETTINGS] Migrated ${c.key} off the old ${c.legacy}ms default to ${this.DEFAULTS[c.key]}ms:`,e)}catch(l){let m=`${c.key}\0${e}`;ht.has(m)||(ht.add(m),console.warn(`[SETTINGS] Failed to migrate ${c.key}; using the new default in memory (reported once per process):`,e,l instanceof Error?l.message:String(l)))}}let d={...this.DEFAULTS};for(let c of Object.keys(this.DEFAULTS))r[c]!==void 0&&(d[c]=Fs(r[c]));return this.finalizeSettings(d,s)}catch(n){console.warn("[SETTINGS] Failed to load settings, using defaults:",e,n instanceof Error?n.message:String(n));let i=this.getAllDefaults();return this.finalizeSettings(i,s)}}};var Ft=require("crypto");function ee(o){let e=(o??"").normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s]/gu," ").replace(/\s+/g," ").trim();return/[\p{L}\p{N}]/u.test(e)?e:""}function G(o){return(o??"").toLowerCase().trim().split(/\s+/).filter(Boolean)}function Pe(o,e){return Math.log(1+e/(o+.5))}function Mt(o,e){return s=>Pe(o(s),e)}function yt(o,e){let s=new Map;for(let t of new Set(o))s.set(t,e(t));return s}function Ut(o,e,s){let t=yt(o,s),n=yt(e,s),i=0,r=0,a=0;for(let[_,E]of t){r+=E*E;let d=n.get(_);d!==void 0&&(i+=E*d)}for(let[,_]of n)a+=_*_;return r===0||a===0?0:i/Math.sqrt(r*a)}function vt(o,e,s,t){let n=new Set(o),i=new Set(e);for(let r of n)if(!i.has(r)&&s(r)>t)return!0;for(let r of i)if(!n.has(r)&&s(r)>t)return!0;return!1}function xe(o,e,s,t){let n=ee(o);if(n!==""&&n===ee(e))return{tier:"exact",method:"exact",score:1};let i=G(o),r=G(e),a=t.minSharedTokens??2,_=new Set(r),E=0;for(let c of new Set(i))_.has(c)&&E++;if(E<a)return{tier:"none",method:"none",score:0};let d=Ut(i,r,s);return d>=t.cosineThreshold&&!vt(i,r,s,t.vetoThetaIdf)?{tier:"candidate",method:"idf_cosine",score:d}:{tier:"none",method:"none",score:d}}function te(o,e){return!!o&&!!e}function Se(o,e,s,t=!1){let n=ee(s);if(n==="")return null;let i=N(e),r=t?"subagent":"main";return(0,Ft.createHash)("sha256").update(`${o}\0${i}\0${r}\0${n}`).digest("hex").slice(0,32)}function wt(o,e,s){return s===null?null:o.prepare("SELECT id, occurrence_count, created_at_epoch FROM observations WHERE project = ? AND title_norm_key = ? ORDER BY created_at_epoch ASC, id ASC LIMIT 1").get(e,s)??null}function Pt(o,e,s){let t=[...new Set(G(s))],n=o.prepare("INSERT INTO token_df (project, token, df) VALUES (?, ?, 1) ON CONFLICT(project, token) DO UPDATE SET df = df + 1");for(let i of t)n.run(e,i);o.prepare("INSERT INTO dedup_meta (project, doc_count) VALUES (?, 1) ON CONFLICT(project) DO UPDATE SET doc_count = doc_count + 1").run(e)}function xt(o,e){return Pe(o+1,e)}function kt(o,e){return o.prepare("SELECT doc_count FROM dedup_meta WHERE project = ?").get(e)?.doc_count??0}function Bt(o,e){let s=kt(o,e),t=o.prepare("SELECT token, df FROM token_df WHERE project = ?").all(e),n=new Map(t.map(i=>[i.token,i.df]));return{idfFn:Mt(i=>n.get(i)??0,s),docCount:s}}function Xt(o){return o.prepare("INSERT OR IGNORE INTO observation_dedup_candidates (observation_id, duplicate_of_id, project, method, score, status, created_at, created_at_epoch) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")}function Gt(o,e,s){return kt(o,e)>=s}function Ps(o,e,s=Number.POSITIVE_INFINITY){let t=o.prepare("SELECT COUNT(*) c FROM observations WHERE project = ?").get(e).c;if(t>s)return u.warn("DEDUP",`Skipping dedup backfill for project ${e}: ${t} rows exceeds cap ${s} (CLAUDE_MEM_DEDUP_MAX_BACKFILL_ROWS)`),0;let n=o.prepare("SELECT o.id, o.title, o.agent_id, o.agent_type, s.platform_source FROM observations o LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id WHERE o.project = ?").all(e),i=o.prepare("UPDATE observations SET title_norm_key = ? WHERE id = ?"),r=o.prepare("INSERT INTO token_df (project, token, df) VALUES (?, ?, ?)");return o.transaction(()=>{let _=new Map;for(let E of n){i.run(Se(e,E.platform_source,E.title,te(E.agent_id,E.agent_type)),E.id);for(let d of new Set(G(E.title)))_.set(d,(_.get(d)??0)+1)}o.prepare("DELETE FROM token_df WHERE project = ?").run(e);for(let[E,d]of _)r.run(e,E,d);o.prepare("INSERT INTO dedup_meta (project, doc_count, last_rebuild_doc_count, deleted_since_rebuild) VALUES (?, ?, ?, 0) ON CONFLICT(project) DO UPDATE SET doc_count = excluded.doc_count, last_rebuild_doc_count = excluded.last_rebuild_doc_count, deleted_since_rebuild = 0").run(e,n.length,n.length)})(),n.length}function xs(o,e,s){let t=o.prepare("SELECT id, title FROM observations WHERE project = ? AND title IS NOT NULL ORDER BY id ASC").all(e);if(t.length<2)return 0;if(t.length>s.maxBackfillRows)return u.warn("DEDUP",`Skipping dedup sweep for project ${e}: ${t.length} rows exceeds cap ${s.maxBackfillRows}`),0;let{idfFn:n,docCount:i}=Bt(o,e),r={cosineThreshold:s.cosineThreshold,vetoThetaIdf:xt(s.idfVetoDf,i),minSharedTokens:s.minSharedTokens},a=t.map(f=>new Set(G(f.title))),_=new Map;for(let f of a)for(let I of f)_.set(I,(_.get(I)??0)+1);let E=Math.max(2,Math.ceil(Math.sqrt(t.length))*4),d=new Map;a.forEach((f,I)=>{for(let R of f){let p=_.get(R);if(p<2||p>E)continue;let S=d.get(R);S||(S=[],d.set(R,S)),S.push(I)}});let c=new Map;for(let f of d.values())for(let I=0;I<f.length;I++)for(let R=I+1;R<f.length;R++){let p=`${f[I]}:${f[R]}`;c.set(p,(c.get(p)??0)+1)}let l=Xt(o),m=new Date().toISOString(),O=Date.now(),h=0;for(let[f,I]of c){if(I<s.minSharedTokens)continue;let[R,p]=f.split(":").map(Number),S=xe(t[R].title,t[p].title,n,r);S.tier==="candidate"&&(h+=l.run(t[p].id,t[R].id,e,S.method,S.score,"pending",m,O).changes)}return h}function Ht(o,e){return o.prepare("SELECT DISTINCT project FROM observations").all().map(t=>t.project).map(t=>{let n=Ps(o,t,e.maxBackfillRows),i=xs(o,t,e);return{project:t,docs:n,candidates:i}})}function $t(o,e,s,t,n){if(!t)return 0;let{idfFn:i,docCount:r}=Bt(o,e),a={cosineThreshold:n.cosineThreshold,vetoThetaIdf:xt(n.idfVetoDf,r),minSharedTokens:n.minSharedTokens},_=o.prepare("SELECT id, title FROM observations WHERE project = ? AND id != ? AND title IS NOT NULL ORDER BY created_at_epoch DESC, id DESC LIMIT ?").all(e,s,n.maxScan);_.length===n.maxScan&&u.debug("DEDUP",`Tier-1 scan hit MAX_SCAN=${n.maxScan} for project ${e}; older rows covered by dedup-scan`);let E=Xt(o),d=new Date().toISOString(),c=Date.now(),l=0;for(let m of _){let O=xe(t,m.title,i,a);O.tier==="candidate"&&(l+=E.run(s,m.id,e,O.method,O.score,"pending",d,c).changes)}return l}function jt(o,e,s,t,n){let i=Date.now()-t,r=n!==void 0?"up.session_db_id = ?":"up.content_session_id = ?",a=n??e;return o.prepare(`
    SELECT
      up.*,
      s.memory_session_id,
      s.project,
      COALESCE(s.platform_source, '${T}') as platform_source
    FROM user_prompts up
    JOIN sdk_sessions s ON up.session_db_id = s.id
    WHERE ${r}
      AND up.prompt_text = ?
      AND up.created_at_epoch >= ?
    ORDER BY up.created_at_epoch DESC
    LIMIT 1
  `).get(a,s,i)??void 0}var Ae=require("fs");var ks=[{name:"aws_access_key",regex:/AKIA[0-9A-Z]{16}/g},{name:"aws_secret_key",regex:/(?<=AWS_SECRET_ACCESS_KEY\s*[=:]\s*['"]?)[A-Za-z0-9/+=]{40}/g},{name:"github_pat",regex:/\bgh[oprs]_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{82}\b/g},{name:"openai_key",regex:/\bsk-(?!ant-)[A-Za-z0-9_-]{20,}\b/g},{name:"anthropic_key",regex:/\bsk-ant-[A-Za-z0-9_-]{20,}\b/g},{name:"slack_token",regex:/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g},{name:"jwt",regex:/\beyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g},{name:"private_key_pem",regex:/-----BEGIN (?:RSA |DSA |EC |OPENSSH |PGP )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |DSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/g},{name:"stripe_key",regex:/\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{24,}\b/g},{name:"google_api_key",regex:/\bAIza[0-9A-Za-z_-]{35}\b/g},{name:"claude_mem_key",regex:/\bcmem_[A-Za-z0-9_-]{32,}|\bcm_pro_[A-Za-z0-9_-]{8,}/g}],Bs=1024*1024,Xs="<redacted type='oversize'/>";function Yt(o,e){if(!e.enabled||o.length===0)return{redacted:o,counts:{},oversize:!1};if(o.length>Bs)return u.warn("REDACT","field exceeds the 1M-char redaction cap; replaced by an oversize marker",void 0,{inputLength:o.length}),{redacted:Xs,counts:{oversize:1},oversize:!0};let s=new Set(e.disabledBuiltinPatterns??[]),t={},n=o,i=[];for(let a of e.customPatterns??[]){if(!a.name||a.name.length===0){u.warn("REDACT","custom pattern skipped: missing name",void 0,{pattern:a});continue}try{i.push({name:a.name,regex:new RegExp(a.regex,"g")})}catch(_){u.warn("REDACT","custom pattern skipped: invalid regex",{name:a.name},_ instanceof Error?_:new Error(String(_)))}}let r=[...i,...ks];for(let a of r)s.has(a.name)||(a.regex.lastIndex=0,n=n.replace(a.regex,()=>(t[a.name]=(t[a.name]??0)+1,`<redacted type='${a.name}'/>`)));return e.logMatches&&Object.keys(t).length>0&&u.debug("REDACT","patterns matched",void 0,{counts:t}),{redacted:n,counts:t,oversize:!1}}function Gs(o){if(!o||o.trim()==="")return[];try{let e=JSON.parse(o);return Array.isArray(e)?e.filter(s=>s&&typeof s.name=="string"&&typeof s.regex=="string"):(u.warn("REDACT","CLAUDE_MEM_REDACT_CUSTOM_PATTERNS is not a JSON array, ignoring"),[])}catch(e){return u.warn("REDACT","failed to parse CLAUDE_MEM_REDACT_CUSTOM_PATTERNS as JSON",void 0,e instanceof Error?e:new Error(String(e))),[]}}function Hs(o){return{enabled:o.CLAUDE_MEM_REDACT_ENABLED==="true",disabledBuiltinPatterns:(o.CLAUDE_MEM_REDACT_DISABLED_BUILTINS??"").split(",").map(e=>e.trim()).filter(Boolean),customPatterns:Gs(o.CLAUDE_MEM_REDACT_CUSTOM_PATTERNS??"[]"),logMatches:o.CLAUDE_MEM_REDACT_LOG_MATCHES==="true"}}var se=null,Wt=0,$s=5e3,ne=null,Kt=!1,js={enabled:!0,disabledBuiltinPatterns:[],customPatterns:[],logMatches:!1},Ws=/"CLAUDE_MEM_REDACT_ENABLED"\s*:\s*"true"/;function Ks(o){if(!(0,Ae.existsSync)(o))return null;try{return(0,Ae.readFileSync)(o,"utf-8")}catch{return""}}function Ys(o){if(o===null)return!1;try{let e=JSON.parse(be(o));return e===null||typeof e!="object"||Array.isArray(e)}catch{return!0}}function Vs(o,e,s){return process.env.CLAUDE_MEM_REDACT_ENABLED==="false"||!(ne?.enabled===!0||Ws.test(e))?s:(Kt||(Kt=!0,u.warn("REDACT","settings.json could not be read; secret redaction stays on until it is repaired",{settingsPath:o,using:ne?.enabled?"the last configuration that loaded":"the built-in patterns"})),ne?.enabled?ne:js)}function Vt(o=ue){let e=Date.now();if(se&&e-Wt<$s)return se;let s=K.loadFromFile(o),t=Hs(s),n=t.enabled?null:Ks(o);return Ys(n)?se=Vs(o,n,t):(se=t,ne=t),Wt=e,se}var ke=["private","claude-mem-context","system_instruction","system-instruction","persisted-output","system-reminder"],qt=new RegExp(`<(${ke.join("|")})\\b[^>]*>[\\s\\S]*?</\\1>`,"g");var Jt=100;function qs(o){let e=Object.fromEntries(ke.map(i=>[i,0]));qt.lastIndex=0;let s=0,t=o.replace(qt,(i,r)=>(e[r]=(e[r]??0)+1,s+=1,""));return s>Jt&&u.warn("SYSTEM","tag count exceeds limit",void 0,{tagCount:s,maxAllowed:Jt,contentLength:o.length}),{stripped:Yt(t.trim(),Vt()).redacted,counts:e}}function ge(o){return qs(o).stripped}var Cr=new RegExp(`<(${ke.join("|")})\\b[^>]*>[\\s\\S]*?</\\1>`);var Js=["task-notification"],hr=new RegExp(`^\\s*<(${Js.join("|")})\\b[^>]*>(?:(?!<\\1\\b|</\\1\\b)[\\s\\S])*</\\1>\\s*$`),Dr=256*1024;var Be=4e3,Xe="[media prompt]";function re(o){let e=o.trim(),t=ge(o).trim()||e;return t.length<=Be?t:(u.debug("DB","Truncated stored prompt text to the configured cap",{originalLength:t.length,storedLength:Be}),`${t.slice(0,Be-1)}\u2026`)}var zs=require("bun:sqlite");var zt=5e3,Qs=4194304,V=65;function Qt(o){return o.prepare("PRAGMA user_version").get().user_version}var oe=class extends Error{reason="schema_newer_than_binary";constructor(e){super(e),this.name="SchemaNewerThanBinaryError"}};function ie(o,e){o.run(`PRAGMA busy_timeout = ${zt}`);let s=Qt(o);if(!(s<=e))throw new oe(`SQLite database has schema v${s}; this claude-mem knows up to schema v${e}. Upgrade claude-mem before opening this database.`)}function Ge(o,e){ie(o,e),Qt(o)<e&&o.run(`PRAGMA user_version = ${e}`)}function Zt(o,e){o.transaction(()=>Ge(o,e)).immediate()}function Zs(o){return o.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
      AND name NOT LIKE 'sqlite_%'
    LIMIT 1
  `).get()!=null}function Y(o,e,s){try{o.run(e)}catch(t){let n=t instanceof Error?t:new Error(String(t));throw u.warn("DB",`Failed to apply SQLite pragma ${s}`,{sql:e},n),t}}function Oe(o,e={}){let{enableWal:s=!0,enableIncrementalAutoVacuum:t=!0}=e;Y(o,`PRAGMA busy_timeout = ${zt}`,"busy_timeout"),Y(o,"PRAGMA foreign_keys = ON","foreign_keys"),Y(o,"PRAGMA synchronous = NORMAL","synchronous"),Y(o,`PRAGMA journal_size_limit = ${Qs}`,"journal_size_limit"),t&&!Zs(o)&&Y(o,"PRAGMA auto_vacuum = INCREMENTAL","auto_vacuum"),s&&Y(o,"PRAGMA journal_mode = WAL","journal_mode")}var es=!1;function fe(o,...e){return typeof o.iterate=="function"?o.iterate(...e):(es||(es=!0,u.warn("DB","bun:sqlite lacks Statement.iterate(); falling back to .all()",{bunVersion:typeof Bun<"u"?Bun.version:"unknown",requiredBunVersion:">=1.1.31",impact:"rows are materialized in memory; upgrade Bun to restore streaming"})),o.all(...e))}function He(o,e,s,t){try{let n=Number(t.limit);if(!Number.isInteger(n)||n<0)throw new Error("Page limit must be a non-negative integer");let i=Number(t.offset??0);if(!Number.isInteger(i))throw new Error("Page offset must be an integer");let r=[];if(n===0)return r;let a=Math.max(0,i);for(let _ of fe(o,...e))if(s(_)){if(a>0){a--;continue}if(r.push(_),r.length===n)break}return r}finally{o.finalize()}}var We=require("bun:sqlite");function q(o){return o.replace(/\\/g,"/").replace(/\/+/g,"/").replace(/\/+$/,"")}function $e(o,e){let s=q(o),t=q(e);if(s.startsWith(t+"/"))return!s.slice(t.length+1).includes("/");let n=t.split("/"),i=s.split("/");if(i.length<2)return t===""||t===".";let r=i.slice(0,-1).join("/"),a=i[i.length-1],_=/^([A-Za-z]:)?\//;if(!_.test(t)&&_.test(s)&&t!==""&&r.endsWith("/"+t))return a!=="";if(t.endsWith("/"+r)||t===r)return!a.includes("/");for(let E=0;E<n.length;E++)if(n.slice(E).join("/")===r)return!0;return!1}var en=/^\d{4}-\d{2}-\d{2}$/;function H(o,e){if(typeof o=="number")return o;let s=o.trim(),t=new Date(s).getTime();return e==="end"&&en.test(s)?t+864e5-1:t}var je="\\u0E00-\\u0EFF\\u1000-\\u109F\\u1780-\\u17FF\\u3040-\\u30FF\\u3100-\\u318F\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uAC00-\\uD7AF\\uF900-\\uFAFF",ts=["observations_ai","observations_ad","observations_au"],ss=["session_summaries_ai","session_summaries_ad","session_summaries_au"],ae=`
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
`,_e=`
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
`,ns=class o{db;constructor(e=le){e instanceof We.Database?this.db=e:(pe(M),this.db=new We.Database(e)),ie(this.db,V),Oe(this.db),this._fts5Available=this.isFts5Available(),this.ensureFTSTables()}_fts5Available;ensureFTSTables(){let e=this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%_fts'").all(),s=e.some(i=>i.name==="observations_fts"),t=e.some(i=>i.name==="session_summaries_fts");if(s&&t&&this.hasAllFtsTriggers(ts)&&this.hasAllFtsTriggers(ss))return;if(!this.isFts5Available()){u.warn("DB","FTS5 not available on this platform \u2014 skipping FTS table creation (search uses ChromaDB)");return}let n=s&&t;u.info("DB",n?"Converging FTS5 indexes and recreating missing sync triggers":"Creating FTS5 tables");try{this.db.transaction(()=>{Ge(this.db,V);let i=this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%_fts'").all(),r=!i.some(d=>d.name==="observations_fts"),a=!i.some(d=>d.name==="session_summaries_fts"),_=!r&&!this.hasAllFtsTriggers(ts),E=!a&&!this.hasAllFtsTriggers(ss);this.createFTSTablesAndTriggers(r,a),_&&(this.rebuildFtsIndex("observations_fts"),this.db.run(ae)),E&&(this.rebuildFtsIndex("session_summaries_fts"),this.db.run(_e))}).immediate(),u.info("DB",n?"FTS5 indexes converged and sync triggers recreated":"FTS5 tables created successfully")}catch(i){if(i instanceof oe)throw i;this._fts5Available=!1,u.warn("DB","FTS5 table creation failed \u2014 search will use ChromaDB and LIKE queries",{},i instanceof Error?i:void 0)}}hasAllFtsTriggers(e){let s=e.map(()=>"?").join(", ");return this.db.prepare(`SELECT name FROM sqlite_master WHERE type='trigger' AND name IN (${s})`).all(...e).length===e.length}rebuildFtsIndex(e){this.db.run(`INSERT INTO ${e}(${e}) VALUES('rebuild')`)}isFts5Available(){try{return this.db.run("CREATE VIRTUAL TABLE temp._fts5_probe USING fts5(test_column)"),this.db.run("DROP TABLE temp._fts5_probe"),!0}catch(e){return u.debug("DB","FTS5 probe failed \u2014 FTS5 unavailable on this platform",void 0,e instanceof Error?e:new Error(String(e))),!1}}canReadFtsIndex(e){try{return this.db.prepare(`SELECT rowid FROM ${e} WHERE ${e} MATCH ? LIMIT 0`).all('"fts_read_probe"'),!0}catch{return!1}}createFTSTablesAndTriggers(e,s){e&&(this.db.run(`
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
      `),this.db.run(ae)),s&&(this.db.run(`
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
      `),this.db.run(_e))}buildFilterClause(e,s,t="o"){let n=[],i=F(e);if(i.length>0){let r=w(t,i,{includeMerged:!0});n.push(r.sql),s.push(...r.params)}if(e.platformSource&&(n.push(`COALESCE(NULLIF((SELECT s2.platform_source FROM sdk_sessions s2 WHERE s2.memory_session_id = ${t}.memory_session_id), ''), '${T}') = ?`),s.push(N(e.platformSource))),e.type)if(Array.isArray(e.type)){let r=e.type.map(()=>"?").join(",");n.push(`${t}.type IN (${r})`),s.push(...e.type)}else n.push(`${t}.type = ?`),s.push(e.type);if(e.dateRange){let{start:r,end:a}=e.dateRange;r&&(n.push(`${t}.created_at_epoch >= ?`),s.push(H(r,"start"))),a&&(n.push(`${t}.created_at_epoch <= ?`),s.push(H(a,"end")))}if(e.concepts){let r=Array.isArray(e.concepts)?e.concepts:[e.concepts],a=`${t}.concepts`,_=`CASE WHEN json_valid(${a}) THEN CASE
        WHEN json_type(${a}) = 'array' THEN ${a}
        WHEN json_type(${a}) = 'text' THEN json_array(json_extract(${a}, '$'))
        ELSE json_array(${a}) END ELSE json_array(${a}) END`,E=r.map(()=>`EXISTS (SELECT 1 FROM json_each(${_}) WHERE type = 'text' AND value = ?)`);E.length>0&&(n.push(`(${E.join(" OR ")})`),s.push(...r))}if(e.files){let r=Array.isArray(e.files)?e.files:[e.files],a=t==="s"?"files_edited":"files_modified",_=r.map(()=>`(
          EXISTS (SELECT 1 FROM json_each(${o.fileArrayJson(`${t}.files_read`)}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\')
          OR EXISTS (SELECT 1 FROM json_each(${o.fileArrayJson(`${t}.${a}`)}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\')
        )`);_.length>0&&(n.push(`(${_.join(" OR ")})`),r.forEach(E=>{let d=E.replace(/[\\%_]/g,"\\$&");s.push(`%${d}%`,`%${d}%`)}))}return n.length>0?n.join(" AND "):""}static UNSEGMENTED_SCRIPT=new RegExp(`[${je}]`);static UNSEGMENTED_RUN=new RegExp(`[${je}]+|[^\\s${je}]+`,"g");static MAX_SUBSTRING_TERMS=500;static buildSubstringClause(e,s){let t=[...new Set(e.match(o.UNSEGMENTED_RUN)??[])].slice(0,o.MAX_SUBSTRING_TERMS);t.length===0&&t.push(e);let n=[];return{clause:`(${t.map(r=>{let a=`%${r.replace(/[\\%_]/g,"\\$&")}%`;for(let _=0;_<s.length;_+=1)n.push(a);return`(${s.map(_=>`${_} LIKE ? ESCAPE '\\'`).join(" OR ")})`}).join(" AND ")})`,params:n}}static MIN_ANY_TERM_TOKENS=3;static buildFTSMatchQuery(e){let s=(e.match(/\S+/g)??[]).filter(t=>/[\p{L}\p{N}]/u.test(t));return s.length===0?`"${e.replace(/"/g,'""')}"`:s.map(t=>`"${t.replace(/"/g,'""')}"`).join(" AND ")}static buildFTSAnyTermQuery(e){let s=(e.match(/\S+/g)??[]).filter(t=>/[\p{L}\p{N}]/u.test(t));return s.length<o.MIN_ANY_TERM_TOKENS?null:s.map(t=>`"${t.replace(/"/g,'""')}"`).join(" OR ")}buildOrderClause(e="relevance",s=!0,t="observations_fts"){switch(e){case"relevance":return s?`ORDER BY ${t}.rank ASC`:"ORDER BY o.created_at_epoch DESC";case"date_desc":return"ORDER BY o.created_at_epoch DESC, o.id DESC";case"date_asc":return"ORDER BY o.created_at_epoch ASC, o.id ASC";default:return"ORDER BY o.created_at_epoch DESC"}}searchObservationsBySubstring(e,s,t,n,i){let r=o.buildSubstringClause(e,["o.title","o.subtitle","o.narrative","o.text","o.facts","o.concepts"]),a=[],_=this.buildFilterClause(s,a,"o"),E=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${r.clause}
      ${_?"AND "+_:""}
      ${this.buildOrderClause(t,!1)}
      LIMIT ? OFFSET ?
    `;return this.db.prepare(E).all(...r.params,...a,n,i)}searchSessionsBySubstring(e,s,t,n,i){let r=o.buildSubstringClause(e,["s.request","s.investigated","s.learned","s.completed","s.next_steps","s.notes"]),a={...s};delete a.type;let _=[],E=this.buildFilterClause(a,_,"s"),d=t==="date_asc"?"ORDER BY s.created_at_epoch ASC, s.id ASC":"ORDER BY s.created_at_epoch DESC, s.id DESC",c=`
      SELECT s.*, s.discovery_tokens
      FROM session_summaries s
      WHERE ${r.clause}
      ${E?"AND "+E:""}
      ${d}
      LIMIT ? OFFSET ?
    `;return this.db.prepare(c).all(...r.params,..._,n,i)}searchObservations(e,s={}){let t=[],{limit:n=50,offset:i=0,orderBy:r="relevance",...a}=s;if(!e){let _=this.buildFilterClause(a,t,"o");if(!_)return[];let E=this.buildOrderClause(r,!1),d=`
        SELECT o.*, o.discovery_tokens
        FROM observations o
        WHERE ${_}
        ${E}
        LIMIT ? OFFSET ?
      `;return t.push(n,i),this.db.prepare(d).all(...t)}if(o.UNSEGMENTED_SCRIPT.test(e))return this.searchObservationsBySubstring(e,a,r,n,i);if(this._fts5Available||this.canReadFtsIndex("observations_fts")){let _=this.buildFilterClause(a,t,"o"),E=this.buildOrderClause(r,!0,"observations_fts"),d=`
        SELECT o.*, o.discovery_tokens
        FROM observations o
        JOIN observations_fts ON observations_fts.rowid = o.id
        WHERE observations_fts MATCH ?
        ${_?"AND "+_:""}
        ${E}
        LIMIT ? OFFSET ?
      `;t.unshift(o.buildFTSMatchQuery(e));let c;try{c=this.db.prepare(d).all(...t,n,i)}catch(m){throw u.warn("DB","FTS5 observation search failed",{},m instanceof Error?m:void 0),m}if(c.length>0||i>0&&this.db.prepare(d).all(...t,1,0).length>0)return c;let l=this.searchObservationsBySubstring(e,a,r,n,i);return l.length>0||i>0&&this.searchObservationsBySubstring(e,a,r,1,0).length>0?l:this.searchFtsAnyTerm(d,e,t,n,i)??l}return this.searchObservationsBySubstring(e,a,r,n,i)}searchSessions(e,s={}){let t=[],{limit:n=50,offset:i=0,orderBy:r="relevance",...a}=s;if(!e){let _={...a};delete _.type;let E=this.buildFilterClause(_,t,"s");if(!E)return[];let c=`
        SELECT s.*, s.discovery_tokens
        FROM session_summaries s
        WHERE ${E}
        ${r==="date_asc"?"ORDER BY s.created_at_epoch ASC, s.id ASC":"ORDER BY s.created_at_epoch DESC, s.id DESC"}
        LIMIT ? OFFSET ?
      `;return t.push(n,i),this.db.prepare(c).all(...t)}if(o.UNSEGMENTED_SCRIPT.test(e))return this.searchSessionsBySubstring(e,a,r,n,i);if(this._fts5Available||this.canReadFtsIndex("session_summaries_fts")){let _={...a};delete _.type;let E=this.buildFilterClause(_,t,"s"),d=r==="date_asc"?"ORDER BY s.created_at_epoch ASC, s.id ASC":r==="date_desc"?"ORDER BY s.created_at_epoch DESC, s.id DESC":"ORDER BY session_summaries_fts.rank ASC",c=`
        SELECT s.*, s.discovery_tokens
        FROM session_summaries s
        JOIN session_summaries_fts ON session_summaries_fts.rowid = s.id
        WHERE session_summaries_fts MATCH ?
        ${E?"AND "+E:""}
        ${d}
        LIMIT ? OFFSET ?
      `;t.unshift(o.buildFTSMatchQuery(e));let l;try{l=this.db.prepare(c).all(...t,n,i)}catch(O){throw u.warn("DB","FTS5 session search failed",{},O instanceof Error?O:void 0),O}if(l.length>0||i>0&&this.db.prepare(c).all(...t,1,0).length>0)return l;let m=this.searchSessionsBySubstring(e,a,r,n,i);return m.length>0||i>0&&this.searchSessionsBySubstring(e,a,r,1,0).length>0?m:this.searchFtsAnyTerm(c,e,t,n,i)??m}return this.searchSessionsBySubstring(e,a,r,n,i)}searchFtsAnyTerm(e,s,t,n,i){let r=o.buildFTSAnyTermQuery(s);if(!r)return null;let a=[r,...t.slice(1)],_=this.db.prepare(e).all(...a,n,i);return _.length>0||i>0&&this.db.prepare(e).all(...a,1,0).length>0?_:null}findByConcept(e,s={}){let t=[],{limit:n=50,offset:i=0,orderBy:r="date_desc",...a}=s,_={...a,concepts:e},E=this.buildFilterClause(_,t,"o"),d=this.buildOrderClause(r,!1),c=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${E}
      ${d}
      LIMIT ? OFFSET ?
    `;return t.push(n,i),this.db.prepare(c).all(...t)}hasDirectChildFile(e,s){let t=n=>{if(!n)return!1;try{let i=JSON.parse(n);if(Array.isArray(i))return i.some(r=>typeof r=="string"&&$e(r,s))}catch(i){u.debug("DB",`Failed to parse files JSON for observation ${e.id}`,void 0,i instanceof Error?i:void 0)}return!1};return t(e.files_modified)||t(e.files_read)}hasDirectChildFileSession(e,s){let t=n=>{if(!n)return!1;try{let i=JSON.parse(n);if(Array.isArray(i))return i.some(r=>typeof r=="string"&&$e(r,s))}catch(i){u.debug("DB",`Failed to parse files JSON for session summary ${e.id}`,void 0,i instanceof Error?i:void 0)}return!1};return t(e.files_read)||t(e.files_edited)}static filePathPatterns(e,s){let t=_=>_.replace(/[\\%_]/g,"\\$&"),n=s?[e,q(e),q(e).replaceAll("/","\\")]:[e],i=[...new Set(n)].map(_=>`%${t(_)}%`);if(!s||!/^([A-Za-z]:)?[\\/]/.test(e))return i;let r=q(e).split("/").filter(_=>_.length>0),a=/^[A-Za-z]:$/.test(r[0]??"")?1:0;for(let _=a;_<r.length;_+=1){let E=r.slice(_);i.push(`${t(E.join("/")+"/")}%`),e.includes("\\")&&i.push(`${t(E.join("\\")+"\\")}%`)}return i}static fileArrayJson(e){return`CASE WHEN json_valid(${e}) THEN CASE WHEN json_type(${e}) = 'array' THEN ${e} ELSE '[]' END ELSE '[]' END`}static jsonArrayLikeClause(e,s){let t=Array.from({length:s},()=>"type = 'text' AND value LIKE ? ESCAPE '\\'").join(" OR ");return`(${e.map(n=>`EXISTS (SELECT 1 FROM json_each(${o.fileArrayJson(n)}) WHERE ${t})`).join(" OR ")})`}findByFile(e,s={}){let t=[],{limit:n=50,offset:i=0,orderBy:r="date_desc",isFolder:a=!1,..._}=s;delete _.files;let E=a?"":"LIMIT ? OFFSET ?",d=o.filePathPatterns(e,a),c=this.buildFilterClause(_,t,"o");t.push(...d,...d);let l=[c,o.jsonArrayLikeClause(["o.files_read","o.files_modified"],d.length)].filter(Boolean).join(" AND "),m=`${this.buildOrderClause(r,!1)}, o.id ${r==="date_asc"?"ASC":"DESC"}`,O=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${l}
      ${m}
      ${E}
    `;a||t.push(n,i);let h=this.db.prepare(O),f=a?He(h,t,g=>this.hasDirectChildFile(g,e),{limit:n,offset:i}):h.all(...t),I=[],R={..._};delete R.type;let p=[],S=F(R);if(S.length>0){let g=w("s",S,{includeMerged:!0});p.push(g.sql),I.push(...g.params)}if(R.platformSource&&(p.push(`COALESCE(NULLIF((SELECT s2.platform_source FROM sdk_sessions s2 WHERE s2.memory_session_id = s.memory_session_id), ''), '${T}') = ?`),I.push(N(R.platformSource))),R.dateRange){let{start:g,end:y}=R.dateRange;g&&(p.push("s.created_at_epoch >= ?"),I.push(H(g,"start"))),y&&(p.push("s.created_at_epoch <= ?"),I.push(H(y,"end")))}p.push(o.jsonArrayLikeClause(["s.files_read","s.files_edited"],d.length)),I.push(...d,...d);let U=`
      SELECT s.*, s.discovery_tokens
      FROM session_summaries s
      WHERE ${p.join(" AND ")}
      ORDER BY s.created_at_epoch ${r==="date_asc"?"ASC":"DESC"}
      ${E}
    `;a||I.push(n,i);let A=this.db.prepare(U),D=a?He(A,I,g=>this.hasDirectChildFileSession(g,e),{limit:n,offset:i}):A.all(...I);return{observations:f,sessions:D}}findByType(e,s={}){let t=[],{limit:n=50,offset:i=0,orderBy:r="date_desc",...a}=s,_={...a,type:e},E=this.buildFilterClause(_,t,"o"),d=this.buildOrderClause(r,!1),c=`
      SELECT o.*, o.discovery_tokens
      FROM observations o
      WHERE ${E}
      ${d}
      LIMIT ? OFFSET ?
    `;return t.push(n,i),this.db.prepare(c).all(...t)}searchUserPrompts(e,s={}){let t=[],{limit:n=20,offset:i=0,orderBy:r="relevance",...a}=s,_=[],E=F(a);if(E.length>0){let O=w("s",E,{includeMerged:!1});_.push(O.sql),t.push(...O.params)}if(a.platformSource&&(_.push(`COALESCE(NULLIF(s.platform_source, ''), '${T}') = ?`),t.push(N(a.platformSource))),a.dateRange){let{start:O,end:h}=a.dateRange;O&&(_.push("up.created_at_epoch >= ?"),t.push(H(O,"start"))),h&&(_.push("up.created_at_epoch <= ?"),t.push(H(h,"end")))}if(!e){if(_.length===0)return[];let O=`WHERE ${_.join(" AND ")}`,f=`
        SELECT
          up.*,
          s.project,
          s.memory_session_id,
          COALESCE(NULLIF(s.platform_source, ''), '${T}') as platform_source
        FROM user_prompts up
        JOIN sdk_sessions s ON up.session_db_id = s.id
        ${O}
        ${r==="date_asc"?"ORDER BY up.created_at_epoch ASC, up.id ASC":"ORDER BY up.created_at_epoch DESC, up.id DESC"}
        LIMIT ? OFFSET ?
      `;return t.push(n,i),this.db.prepare(f).all(...t)}let d=e.replace(/[\\%_]/g,"\\$&");_.push("up.prompt_text LIKE ? ESCAPE '\\'"),t.push(`%${d}%`);let c=`WHERE ${_.join(" AND ")}`,m=`
      SELECT
        up.*,
        s.project,
        s.memory_session_id,
        COALESCE(NULLIF(s.platform_source, ''), '${T}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      ${c}
      ${r==="date_asc"?"ORDER BY up.created_at_epoch ASC, up.id ASC":"ORDER BY up.created_at_epoch DESC, up.id DESC"}
      LIMIT ? OFFSET ?
    `;return t.push(n,i),this.db.prepare(m).all(...t)}close(){this.db.close()}};var tn=/^(?:0|[1-9][0-9]*)$/,sn=18446744073709551615n;function Ke(o){throw u.debug("CLOUD_SYNC","Rejected invalid canonical content",{reason:o}),new Error(`canonical content: ${o}`)}function rs(o,e={}){return typeof o!="string"||!tn.test(o)?Ke("decimal values must be unsigned base-10 strings without leading zeroes"):(BigInt(o)>sn&&Ke("decimal value exceeds uint64"),e.positive&&o==="0"&&Ke("decimal value must be positive"),o)}var is=5*6e4,b=o=>typeof o=="object"&&o!==null?JSON.stringify(o):o??null;function as(o){let e=[],s=[],t=new Set,n=new Set;for(let i of o){for(let r of i.files_read??[])!r||t.has(r)||(t.add(r),e.push(r));for(let r of i.files_modified??[])!r||n.has(r)||(n.add(r),s.push(r))}return{files_read:e,files_edited:s}}var nn=200,rn=1e3,on=56,an=57;function Ye(o){let e=Number(o);return Number.isSafeInteger(e)&&e>0?e:void 0}var qe=class{db;constructor(e=le){e instanceof Ve.Database?this.db=e:(e!==":memory:"&&pe(M),this.db=new Ve.Database(e)),ie(this.db,V),Oe(this.db),Zt(this.db,V),this.initializeSchema(),this.ensureWorkerPortColumn(),this.ensurePromptTrackingColumns(),this.removeSessionSummariesUniqueConstraint(),this.addObservationHierarchicalFields(),this.makeObservationsTextNullable(),this.createUserPromptsTable(),this.ensureDiscoveryTokensColumn(),this.createPendingMessagesTable(),this.renameSessionIdColumns(),this.addFailedAtEpochColumn(),this.addOnUpdateCascadeToForeignKeys(),this.addObservationContentHashColumn(),this.addSessionCustomTitleColumn(),this.addSessionPlatformSourceColumn(),this.addObservationModelColumns(),this.ensureMergedIntoProjectColumns(),this.addObservationSubagentColumns(),this.addObservationsUniqueContentHashIndex(),this.addObservationsMetadataColumn(),this.dropDeadPendingMessagesColumns(),this.ensurePendingMessagesToolUseIdColumn(),this.dropWorkerPidColumn(),this.ensureSDKSessionsPlatformContentIdentity(),this.ensureUserPromptsSessionDbId(),this.ensurePendingMessagesSessionToolUniqueIndex(),this.ensureSyncedAtColumns(),this.ensureSyncOriginColumns(),this.ensureSyncOutbox(),this.ensureSyncEntityLedger(),this.ensureSyncRevisionTextAffinity(),this.initializeSyncHubLaunchBaseline(),this.normalizeConceptTags(),this.ensureSDKSessionsObservedColumns(),this.ensureToolUsesTable(),this.ensureTelegramWrapupsTable(),this.addDedupTables(),this.refreshUnicodeTitleNormKeys(),this.ensureReinforcementColumns(),this.ensureSessionCwdColumn(),this.dropWriteOnlyUserPromptsFtsAndScopeFtsUpdateTriggers(),this.ensureProjectNocaseIndexes(),this.ensureAdvisorCallsTable(),this.ensureSessionProjectKeySourceColumn(),this.requeuePromptsDeadLetteredForSize(),this.ensureWorkStateTable(),this.ensureHookSpoolConsumedTable(),this.ensureProjectRecencyIndexes(),this.ensureMergedIntoProjectCoveringIndexes(),this.ensureNativePromptIdentity()}ensureNativePromptIdentity(){this.db.transaction(()=>{let e=this.db.query("PRAGMA table_info(user_prompts)").all();for(let s of["native_prompt_id","native_prompt_hash"])e.some(t=>t.name===s)||this.db.run(`ALTER TABLE user_prompts ADD COLUMN ${s} TEXT`);this.db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_user_prompts_native_identity
        ON user_prompts(session_db_id, native_prompt_id) WHERE native_prompt_id IS NOT NULL`)}).immediate()}refreshUnicodeTitleNormKeys(){this.db.transaction(()=>{if(this.db.query("SELECT version FROM schema_versions WHERE version = 65").get())return;let e=this.db.prepare(`SELECT o.id, o.project, o.title, o.agent_id, o.agent_type,
        s.platform_source FROM observations o LEFT JOIN sdk_sessions s
        ON s.memory_session_id = o.memory_session_id ORDER BY o.id`),s=this.db.prepare("UPDATE observations SET title_norm_key = ? WHERE id = ?");try{for(let t of fe(e)){let n=t;s.run(Se(n.project,n.platform_source,n.title,te(n.agent_id,n.agent_type)),n.id)}this.db.prepare("INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)").run(65,new Date().toISOString())}finally{e.finalize(),s.finalize()}}).immediate()}getIndexColumns(e){return this.db.query(`PRAGMA index_info(${JSON.stringify(e)})`).all().map(s=>s.name)}hasUniqueIndexOnColumns(e,s){return this.db.query(`PRAGMA index_list(${e})`).all().some(n=>{if(n.unique!==1)return!1;let i=this.getIndexColumns(n.name);return i.length===s.length&&i.every((r,a)=>r===s[a])})}resolvePromptSessionDbId(e,s,t){if(s!==void 0)return s;let n=t?N(t):void 0;return n?this.db.prepare(`
        SELECT id
        FROM sdk_sessions
        WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
          AND content_session_id = ?
        LIMIT 1
      `).get(T,n,e)?.id??null:this.db.prepare(`
      SELECT id
      FROM sdk_sessions
      WHERE content_session_id = ?
      ORDER BY CASE COALESCE(NULLIF(platform_source, ''), '${T}')
        WHEN '${T}' THEN 0
        ELSE 1
      END, id
      LIMIT 1
    `).get(e)?.id??null}addDedupTables(){let e=this.db.query("PRAGMA table_info(observations)").all();e.some(s=>s.name==="occurrence_count")||this.db.run("ALTER TABLE observations ADD COLUMN occurrence_count INTEGER NOT NULL DEFAULT 1"),e.some(s=>s.name==="title_norm_key")||this.db.run("ALTER TABLE observations ADD COLUMN title_norm_key TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_title_norm ON observations(project, title_norm_key)"),this.db.run(`
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
    `),this.db.run("CREATE INDEX IF NOT EXISTS idx_token_df_project ON token_df(project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_dedup_candidates_project ON observation_dedup_candidates(project, status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_dedup_candidates_obs ON observation_dedup_candidates(observation_id)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(on,new Date().toISOString())}dropWorkerPidColumn(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(32),t=this.db.query("PRAGMA table_info(pending_messages)").all().some(n=>n.name==="worker_pid");if(!(e&&!t)){if(t)try{this.db.run("DROP INDEX IF EXISTS idx_pending_messages_worker_pid"),this.db.run("ALTER TABLE pending_messages DROP COLUMN worker_pid"),u.debug("DB","Dropped worker_pid column and its index from pending_messages")}catch(n){u.warn("DB","Failed to drop worker_pid column from pending_messages",{},n instanceof Error?n:new Error(String(n)));return}e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(32,new Date().toISOString())}}ensureSDKSessionsPlatformContentIdentity(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(33),s=this.hasUniqueIndexOnColumns("sdk_sessions",["content_session_id"]),t=this.hasUniqueIndexOnColumns("sdk_sessions",["platform_source","content_session_id"]),i=this.db.query("PRAGMA table_info(sdk_sessions)").all().some(r=>r.name==="platform_source");if(!(e&&!s&&t&&i)){if(i||this.db.run(`ALTER TABLE sdk_sessions ADD COLUMN platform_source TEXT NOT NULL DEFAULT '${T}'`),this.db.run(`
      UPDATE sdk_sessions
      SET platform_source = '${T}'
      WHERE platform_source IS NULL OR platform_source = ''
    `),s){this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");try{this.rebuildSdkSessionsWithCompositeIdentity(e),this.db.run("COMMIT")}catch(r){this.db.run("ROLLBACK");let a=r instanceof Error?r:new Error(String(r));throw u.error("DB","Failed to rebuild sdk_sessions with composite identity, rolled back",{},a),r}finally{this.db.run("PRAGMA foreign_keys = ON")}return}this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS ux_sdk_sessions_platform_content ON sdk_sessions(platform_source, content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(33,new Date().toISOString())}}rebuildSdkSessionsWithCompositeIdentity(e){this.db.run("DROP TABLE IF EXISTS sdk_sessions_new"),this.db.run(`
      CREATE TABLE sdk_sessions_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_session_id TEXT NOT NULL,
        memory_session_id TEXT UNIQUE,
        project TEXT NOT NULL,
        platform_source TEXT NOT NULL DEFAULT '${T}',
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
        COALESCE(NULLIF(platform_source, ''), '${T}'),
        user_prompt, started_at, started_at_epoch, completed_at, completed_at_epoch,
        status, worker_port, prompt_counter, custom_title
      FROM sdk_sessions
    `),this.db.run("DROP TABLE sdk_sessions"),this.db.run("ALTER TABLE sdk_sessions_new RENAME TO sdk_sessions"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_claude_id ON sdk_sessions(content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_sdk_id ON sdk_sessions(memory_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_project ON sdk_sessions(project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_status ON sdk_sessions(status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_started ON sdk_sessions(started_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS ux_sdk_sessions_platform_content ON sdk_sessions(platform_source, content_session_id)"),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(33,new Date().toISOString())}ensureUserPromptsSessionDbId(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(34);if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='user_prompts'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(34,new Date().toISOString());return}let n=this.db.query("PRAGMA table_info(user_prompts)").all().some(_=>_.name==="session_db_id"),r=this.db.query("PRAGMA foreign_key_list(user_prompts)").all().some(_=>_.table==="sdk_sessions"&&_.from==="content_session_id");if(e&&n&&!r)return;let a=n?`COALESCE(up.session_db_id, (
          SELECT s.id FROM sdk_sessions s
          WHERE s.content_session_id = up.content_session_id
          ORDER BY CASE COALESCE(NULLIF(s.platform_source, ''), '${T}')
            WHEN '${T}' THEN 0
            ELSE 1
          END, s.id
          LIMIT 1
        ))`:`(
          SELECT s.id FROM sdk_sessions s
          WHERE s.content_session_id = up.content_session_id
          ORDER BY CASE COALESCE(NULLIF(s.platform_source, ''), '${T}')
            WHEN '${T}' THEN 0
            ELSE 1
          END, s.id
          LIMIT 1
        )`;this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");try{this.rebuildUserPromptsWithSessionDbId(e,a),this.db.run("COMMIT")}catch(_){this.db.run("ROLLBACK");let E=_ instanceof Error?_:new Error(String(_));throw u.error("DB","Failed to rebuild user_prompts with session_db_id, rolled back",{},E),_}finally{this.db.run("PRAGMA foreign_keys = ON")}}rebuildUserPromptsWithSessionDbId(e,s){this.db.run("DROP TRIGGER IF EXISTS user_prompts_ai"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_ad"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_au"),this.db.run("DROP TABLE IF EXISTS user_prompts_new"),this.db.run(`
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
        ${s},
        up.content_session_id,
        up.prompt_number,
        up.prompt_text,
        up.created_at,
        up.created_at_epoch
      FROM user_prompts up
    `),this.db.run("DROP TABLE user_prompts"),this.db.run("ALTER TABLE user_prompts_new RENAME TO user_prompts"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_session ON user_prompts(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_claude_session ON user_prompts(content_session_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_created ON user_prompts(created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_prompt_number ON user_prompts(prompt_number)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_lookup ON user_prompts(session_db_id, prompt_number)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_user_prompts_content_lookup ON user_prompts(content_session_id, prompt_number)"),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(34,new Date().toISOString())}ensurePendingMessagesSessionToolUniqueIndex(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(35);if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(35,new Date().toISOString());return}let t=this.hasUniqueIndexOnColumns("pending_messages",["session_db_id","tool_use_id"]);if(!(e&&t)){this.db.run("BEGIN TRANSACTION");try{this.recreatePendingSessionToolUniqueIndex(e),this.db.run("COMMIT")}catch(n){this.db.run("ROLLBACK");let i=n instanceof Error?n:new Error(String(n));throw u.error("DB","Failed to recreate ux_pending_session_tool index, rolled back",{},i),n}}}recreatePendingSessionToolUniqueIndex(e){this.db.run("DROP INDEX IF EXISTS ux_pending_session_tool"),this.db.run(`
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
    `),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(35,new Date().toISOString())}ensureSyncedAtColumns(){for(let e of["observations","session_summaries","user_prompts"])this.db.query(`PRAGMA table_info(${e})`).all().some(n=>n.name==="synced_at")||(this.db.run(`ALTER TABLE ${e} ADD COLUMN synced_at INTEGER`),u.debug("DB",`Added synced_at column to ${e} table`)),this.db.run(`CREATE INDEX IF NOT EXISTS idx_${e}_unsynced ON ${e}(id) WHERE synced_at IS NULL`);this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(39,new Date().toISOString())}ensureSyncOriginColumns(){for(let e of["observations","session_summaries","user_prompts"]){let s=this.db.query(`PRAGMA table_info(${e})`).all(),t=new Set(s.map(n=>n.name));t.has("origin_device_id")||(this.db.run(`ALTER TABLE ${e} ADD COLUMN origin_device_id TEXT`),u.debug("DB",`Added origin_device_id column to ${e} table`)),t.has("origin_local_id")||(this.db.run(`ALTER TABLE ${e} ADD COLUMN origin_local_id TEXT`),u.debug("DB",`Added origin_local_id column to ${e} table`)),t.has("sync_rev")||(this.db.run(`ALTER TABLE ${e} ADD COLUMN sync_rev TEXT NOT NULL DEFAULT '1'`),u.debug("DB",`Added sync_rev column to ${e} table`)),this.db.run(`
        CREATE UNIQUE INDEX IF NOT EXISTS ux_${e}_origin
        ON ${e}(origin_device_id, origin_local_id)
        WHERE origin_device_id IS NOT NULL
      `)}this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_state (
        k TEXT PRIMARY KEY,
        v TEXT
      )
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(41,new Date().toISOString())}ensureSyncOutbox(){this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_outbox (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        op_uuid TEXT NOT NULL UNIQUE,
        rev TEXT NOT NULL DEFAULT '1',
        body TEXT NOT NULL,
        canonical_body TEXT,
        operation_sha256 TEXT,
        created_at_epoch INTEGER NOT NULL
      )
    `);let e=new Set(this.db.query("PRAGMA table_info(sync_outbox)").all().map(s=>s.name));e.has("canonical_body")||this.db.run("ALTER TABLE sync_outbox ADD COLUMN canonical_body TEXT"),e.has("operation_sha256")||this.db.run("ALTER TABLE sync_outbox ADD COLUMN operation_sha256 TEXT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(42,new Date().toISOString())}ensureSyncRevisionTextAffinity(){let e=[{table:"observations",column:"sync_rev",temporary:"sync_rev_text_v46"},{table:"session_summaries",column:"sync_rev",temporary:"sync_rev_text_v46"},{table:"user_prompts",column:"sync_rev",temporary:"sync_rev_text_v46"},{table:"sync_outbox",column:"rev",temporary:"rev_text_v46"}],s=(r,a)=>this.db.query(`PRAGMA table_info(${r})`).all().find(_=>_.name===a),t=r=>r?.type.trim().toUpperCase()==="TEXT";if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(46)&&e.every(r=>t(s(r.table,r.column))))return;this.db.transaction(()=>{for(let r of e){let a=this.db.query(`PRAGMA table_info(${r.table})`).all(),_=a.find(d=>d.name===r.column);if(!_)throw new Error(`schema v46: missing ${r.table}.${r.column}`);for(let d of fe(this.db.query(`
          SELECT CAST(id AS TEXT) AS row_id,
                 typeof(${r.column}) AS storage_type,
                 CAST(${r.column} AS TEXT) AS revision
          FROM ${r.table}
        `))){let c=d;if(c.storage_type==="real")throw new Error(`schema v46: ${r.table}.${r.column} row ${c.row_id} is REAL and unrecoverably rounded`);if(c.storage_type!=="integer"&&c.storage_type!=="text")throw new Error(`schema v46: ${r.table}.${r.column} row ${c.row_id} has unsupported ${c.storage_type} storage`);try{rs(c.revision,{positive:!0})}catch{throw new Error(`schema v46: ${r.table}.${r.column} row ${c.row_id} is not a positive canonical uint64 revision`)}}if(t(_))continue;if(a.some(d=>d.name===r.temporary))throw new Error(`schema v46: unexpected temporary column ${r.table}.${r.temporary}`);this.db.run(`ALTER TABLE ${r.table} ADD COLUMN ${r.temporary} TEXT NOT NULL DEFAULT '1'`),this.db.run(`UPDATE ${r.table} SET ${r.temporary} = CAST(${r.column} AS TEXT)`);let E=this.db.prepare(`
          SELECT CAST(id AS TEXT) AS row_id
          FROM ${r.table}
          WHERE ${r.temporary} <> CAST(${r.column} AS TEXT)
          LIMIT 1
        `).get();if(E)throw new Error(`schema v46: failed to copy ${r.table}.${r.column} row ${E.row_id} exactly`);this.db.run(`ALTER TABLE ${r.table} DROP COLUMN ${r.column}`),this.db.run(`ALTER TABLE ${r.table} RENAME COLUMN ${r.temporary} TO ${r.column}`)}this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(46,new Date().toISOString())})()}ensureSyncEntityLedger(){this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_entity_heads (
        entity_id TEXT PRIMARY KEY,
        kind TEXT NOT NULL CHECK (kind IN ('observation', 'summary', 'prompt')),
        origin_device_id TEXT NOT NULL,
        origin_local_id TEXT NOT NULL,
        entity_rev TEXT NOT NULL,
        operation_sha256 TEXT NOT NULL,
        deleted INTEGER NOT NULL CHECK (deleted IN (0, 1)),
        updated_at_epoch INTEGER NOT NULL
      )
    `),this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_content_outbox (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity_id TEXT NOT NULL,
        kind TEXT NOT NULL CHECK (kind IN ('observation', 'summary', 'prompt')),
        origin_local_id TEXT NOT NULL,
        entity_rev TEXT NOT NULL,
        body TEXT NOT NULL,
        operation_sha256 TEXT NOT NULL,
        deleted INTEGER NOT NULL DEFAULT 0 CHECK (deleted IN (0, 1)),
        created_at_epoch INTEGER NOT NULL,
        UNIQUE(entity_id, entity_rev)
      )
    `),new Set(this.db.query("PRAGMA table_info(sync_content_outbox)").all().map(s=>s.name)).has("deleted")||(this.db.run("ALTER TABLE sync_content_outbox ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0"),this.db.run(`
        UPDATE sync_content_outbox
        SET deleted = CASE WHEN json_extract(body, '$.deleted') = 1 THEN 1 ELSE 0 END
      `)),this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_dead_letter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lane TEXT NOT NULL CHECK (lane IN ('content', 'mutation')),
        queue_key TEXT NOT NULL,
        kind TEXT,
        origin_local_id TEXT,
        entity_rev TEXT,
        reason TEXT NOT NULL,
        raw_body TEXT,
        created_at_epoch INTEGER NOT NULL,
        UNIQUE(lane, queue_key, entity_rev, reason)
      )
    `),this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_pull_quarantine (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        epoch TEXT NOT NULL,
        seq TEXT NOT NULL,
        kind TEXT,
        entity_id TEXT,
        origin_device_id TEXT,
        origin_local_id TEXT,
        entity_rev TEXT,
        operation_sha256 TEXT,
        reason TEXT NOT NULL,
        raw_body TEXT NOT NULL,
        retryable INTEGER NOT NULL DEFAULT 0 CHECK (retryable IN (0, 1)),
        created_at_epoch INTEGER NOT NULL,
        UNIQUE(epoch, seq)
      )
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(44,new Date().toISOString()),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(45,new Date().toISOString())}initializeSyncHubLaunchBaseline(){let e=[{table:"observations",kind:"observation"},{table:"session_summaries",kind:"summary"},{table:"user_prompts",kind:"prompt"}],s=this.db.prepare(`
      SELECT 1 AS present FROM sqlite_master
      WHERE type = 'table' AND name = 'sync_launch_exclusions'
    `).get()!==void 0;this.db.run(`
      CREATE TABLE IF NOT EXISTS sync_launch_exclusions (
        kind TEXT NOT NULL CHECK (kind IN ('observation', 'summary', 'prompt')),
        origin_local_id TEXT NOT NULL,
        through_rev TEXT NOT NULL,
        PRIMARY KEY (kind, origin_local_id)
      )
    `);let t=this.db.prepare("SELECT version, applied_at FROM schema_versions WHERE version = ?").get(47);if(!t){let a=Date.now();this.db.transaction(()=>{this.db.run("DELETE FROM sync_launch_exclusions");for(let{table:d,kind:c}of e)this.db.prepare(`
            INSERT INTO sync_launch_exclusions (kind, origin_local_id, through_rev)
            SELECT ?, CAST(id AS TEXT), CAST(sync_rev AS TEXT)
            FROM ${d}
            WHERE origin_device_id IS NULL
          `).run(c),this.db.prepare(`
            UPDATE ${d} SET synced_at = ?
            WHERE synced_at IS NULL AND origin_device_id IS NULL
          `).run(a);this.db.run("DELETE FROM sync_outbox"),this.db.run("DELETE FROM sync_content_outbox"),this.db.run("DELETE FROM sync_dead_letter"),this.db.run("DELETE FROM sync_state");let E=new Date(a).toISOString();this.db.prepare("INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)").run(47,E),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(48,E)})();return}if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(48)&&s)return;let i=Date.parse(t.applied_at);if(!Number.isSafeInteger(i)||i<0)throw new Error(`schema v48: invalid v47 applied_at ${t.applied_at}`);this.db.transaction(()=>{for(let{table:a,kind:_}of e)this.db.prepare(`
          INSERT OR IGNORE INTO sync_launch_exclusions (kind, origin_local_id, through_rev)
          SELECT ?, CAST(id AS TEXT), CAST(sync_rev AS TEXT)
          FROM ${a}
          WHERE origin_device_id IS NULL
            AND synced_at > 0
            AND synced_at <= ?
        `).run(_,i);this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(48,new Date().toISOString())})()}normalizeConceptTags(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(49))return;let s=0;this.db.transaction(()=>{s=this.db.prepare(`
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
      `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(49,new Date().toISOString())})(),u.debug("DB",`Normalized prefixed concept tags in ${s} observations (v49)`)}dropDeadPendingMessagesColumns(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(31),s=this.db.query("PRAGMA table_info(pending_messages)").all(),t=new Set(s.map(r=>r.name)),i=["retry_count","failed_at_epoch","completed_at_epoch"].filter(r=>t.has(r));if(!(e&&i.length===0)){if(i.length>0){this.db.run("BEGIN TRANSACTION");try{this.db.run("DELETE FROM pending_messages WHERE status NOT IN ('pending', 'processing')");for(let r of i)this.db.run(`ALTER TABLE pending_messages DROP COLUMN ${r}`),u.debug("DB",`Dropped dead column ${r} from pending_messages`);e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(31,new Date().toISOString()),this.db.run("COMMIT")}catch(r){this.db.run("ROLLBACK"),u.warn("DB","Failed to drop dead columns from pending_messages",{},r instanceof Error?r:new Error(String(r)));return}return}e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(31,new Date().toISOString())}}initializeSchema(){this.db.run(`
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
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(4,new Date().toISOString())}ensureWorkerPortColumn(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(t=>t.name==="worker_port")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN worker_port INTEGER"),u.debug("DB","Added worker_port column to sdk_sessions table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(5,new Date().toISOString())}ensurePromptTrackingColumns(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(a=>a.name==="prompt_counter")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN prompt_counter INTEGER DEFAULT 0"),u.debug("DB","Added prompt_counter column to sdk_sessions table")),this.db.query("PRAGMA table_info(observations)").all().some(a=>a.name==="prompt_number")||(this.db.run("ALTER TABLE observations ADD COLUMN prompt_number INTEGER"),u.debug("DB","Added prompt_number column to observations table")),this.db.query("PRAGMA table_info(session_summaries)").all().some(a=>a.name==="prompt_number")||(this.db.run("ALTER TABLE session_summaries ADD COLUMN prompt_number INTEGER"),u.debug("DB","Added prompt_number column to session_summaries table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(6,new Date().toISOString())}repairOrphanedSessionParents(e){let s=this.db.prepare(`
      SELECT COUNT(DISTINCT c.memory_session_id) AS n
      FROM ${e} c
      WHERE c.memory_session_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM sdk_sessions s WHERE s.memory_session_id = c.memory_session_id)
    `).get().n;s!==0&&(this.db.run(`
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
    `),u.warn("DB",`Created ${s} stub sdk_sessions parent(s) for orphaned ${e} rows before rebuild (#3378)`))}hasMemorySessionIdOnUpdateCascade(e){return this.db.query(`PRAGMA foreign_key_list(${e})`).all().some(t=>t.table==="sdk_sessions"&&t.from==="memory_session_id"&&t.on_update==="CASCADE")}carryLiveColumnsOntoNewTable(e,s,t){let n=this.db.query(`PRAGMA table_info(${e})`).all(),i=n.filter(r=>!t.includes(r.name));for(let r of i){let a=r.type?` ${r.type}`:"",_=r.dflt_value===null||r.dflt_value===void 0?"":` DEFAULT ${r.dflt_value}`;this.db.run(`ALTER TABLE ${s} ADD COLUMN "${r.name}"${a}${_}`),u.debug("DB",`Carried ${r.name} over the ${e} rebuild (#3849)`)}return n.map(r=>r.name)}removeSessionSummariesUniqueConstraint(){if(!this.db.query("PRAGMA index_list(session_summaries)").all().some(a=>a.unique===1&&a.origin==="u")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(7,new Date().toISOString());return}u.debug("DB","Removing UNIQUE constraint from session_summaries.memory_session_id"),this.db.run("BEGIN TRANSACTION"),this.repairOrphanedSessionParents("session_summaries");let t=["id","memory_session_id","project","request","investigated","learned","completed","next_steps","files_read","files_edited","notes","prompt_number","created_at","created_at_epoch"],i=this.db.query("PRAGMA table_info(session_summaries)").all().filter(a=>!t.includes(a.name));this.db.run("DROP TABLE IF EXISTS session_summaries_new"),this.db.run(`
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
    `);for(let a of i){let _=a.type?` ${a.type}`:"",E=a.dflt_value===null||a.dflt_value===void 0?"":` DEFAULT ${a.dflt_value}`;this.db.run(`ALTER TABLE session_summaries_new ADD COLUMN "${a.name}"${_}${E}`),u.debug("DB",`Carried ${a.name} over the session_summaries UNIQUE-constraint rebuild (#3890)`)}let r=[...t,...i.map(a=>a.name)].map(a=>`"${a}"`).join(", ");this.db.run(`
      INSERT INTO session_summaries_new (${r})
      SELECT ${r}
      FROM session_summaries
    `),this.db.run("DROP TABLE session_summaries"),this.db.run("ALTER TABLE session_summaries_new RENAME TO session_summaries"),this.db.run(`
      CREATE INDEX idx_session_summaries_sdk_session ON session_summaries(memory_session_id);
      CREATE INDEX idx_session_summaries_project ON session_summaries(project);
      CREATE INDEX idx_session_summaries_created ON session_summaries(created_at_epoch DESC);
    `),this.recreateFtsTriggersIfIndexed("session_summaries"),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(7,new Date().toISOString()),u.debug("DB","Successfully removed UNIQUE constraint from session_summaries.memory_session_id")}addObservationHierarchicalFields(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(8))return;if(this.db.query("PRAGMA table_info(observations)").all().some(n=>n.name==="title")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(8,new Date().toISOString());return}u.debug("DB","Adding hierarchical fields to observations table"),this.db.run(`
      ALTER TABLE observations ADD COLUMN title TEXT;
      ALTER TABLE observations ADD COLUMN subtitle TEXT;
      ALTER TABLE observations ADD COLUMN facts TEXT;
      ALTER TABLE observations ADD COLUMN narrative TEXT;
      ALTER TABLE observations ADD COLUMN concepts TEXT;
      ALTER TABLE observations ADD COLUMN files_read TEXT;
      ALTER TABLE observations ADD COLUMN files_modified TEXT;
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(8,new Date().toISOString()),u.debug("DB","Successfully added hierarchical fields to observations table")}makeObservationsTextNullable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(9))return;let t=this.db.query("PRAGMA table_info(observations)").all().find(n=>n.name==="text");if(!t||t.notnull===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(9,new Date().toISOString());return}u.debug("DB","Making observations.text nullable"),this.db.run("BEGIN TRANSACTION"),this.repairOrphanedSessionParents("observations"),this.db.run("DROP TABLE IF EXISTS observations_new"),this.db.run(`
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
    `),this.recreateFtsTriggersIfIndexed("observations"),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(9,new Date().toISOString()),u.debug("DB","Successfully made observations.text nullable")}recreateFtsTriggersIfIndexed(e){let s=`${e}_fts`;this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = ?").all(s).length>0&&(this.db.run(`INSERT INTO ${s}(${s}) VALUES('rebuild')`),this.db.run(e==="observations"?ae:_e))}createUserPromptsTable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(10))return;if(this.db.query("PRAGMA table_info(user_prompts)").all().length>0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(10,new Date().toISOString());return}u.debug("DB","Creating user_prompts table"),this.db.run("BEGIN TRANSACTION"),this.db.run(`
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
    `),this.db.run("COMMIT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(10,new Date().toISOString()),u.debug("DB","Successfully created user_prompts table")}ensureDiscoveryTokensColumn(){this.db.query("PRAGMA table_info(observations)").all().some(i=>i.name==="discovery_tokens")||(this.db.run("ALTER TABLE observations ADD COLUMN discovery_tokens INTEGER DEFAULT 0"),u.debug("DB","Added discovery_tokens column to observations table")),this.db.query("PRAGMA table_info(session_summaries)").all().some(i=>i.name==="discovery_tokens")||(this.db.run("ALTER TABLE session_summaries ADD COLUMN discovery_tokens INTEGER DEFAULT 0"),u.debug("DB","Added discovery_tokens column to session_summaries table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(11,new Date().toISOString())}createPendingMessagesTable(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(16))return;if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length>0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(16,new Date().toISOString());return}u.debug("DB","Creating pending_messages table"),this.db.run(`
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
    `),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_session ON pending_messages(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_status ON pending_messages(status)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_pending_messages_claude_session ON pending_messages(content_session_id)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(16,new Date().toISOString()),u.debug("DB","pending_messages table created successfully")}renameSessionIdColumns(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(17))return;u.debug("DB","Checking session ID columns for semantic clarity rename");let s=0,t=(n,i,r)=>{let a=this.db.query(`PRAGMA table_info(${n})`).all(),_=a.some(d=>d.name===i);return a.some(d=>d.name===r)?!1:_?(this.db.run(`ALTER TABLE ${n} RENAME COLUMN ${i} TO ${r}`),u.debug("DB",`Renamed ${n}.${i} to ${r}`),!0):(u.warn("DB",`Column ${i} not found in ${n}, skipping rename`),!1)};t("sdk_sessions","claude_session_id","content_session_id")&&s++,t("sdk_sessions","sdk_session_id","memory_session_id")&&s++,t("pending_messages","claude_session_id","content_session_id")&&s++,t("observations","sdk_session_id","memory_session_id")&&s++,t("session_summaries","sdk_session_id","memory_session_id")&&s++,t("user_prompts","claude_session_id","content_session_id")&&s++,this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(17,new Date().toISOString()),s>0?u.debug("DB",`Successfully renamed ${s} session ID columns`):u.debug("DB","No session ID column renames needed (already up to date)")}addFailedAtEpochColumn(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(20))return;this.db.query("PRAGMA table_info(pending_messages)").all().some(n=>n.name==="failed_at_epoch")||(this.db.run("ALTER TABLE pending_messages ADD COLUMN failed_at_epoch INTEGER"),u.debug("DB","Added failed_at_epoch column to pending_messages table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(20,new Date().toISOString())}addOnUpdateCascadeToForeignKeys(){let e=!this.hasMemorySessionIdOnUpdateCascade("observations"),s=!this.hasMemorySessionIdOnUpdateCascade("session_summaries");if(!e&&!s){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(21,new Date().toISOString());return}u.debug("DB","Adding ON UPDATE CASCADE to FK constraints on observations and session_summaries"),this.db.run("PRAGMA foreign_keys = OFF"),this.db.run("BEGIN TRANSACTION");let t=["id","memory_session_id","project","text","type","title","subtitle","facts","narrative","concepts","files_read","files_modified","prompt_number","discovery_tokens","created_at","created_at_epoch"],n=`
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
    `,i=`
      CREATE INDEX idx_observations_sdk_session ON observations(memory_session_id);
      CREATE INDEX idx_observations_project ON observations(project);
      CREATE INDEX idx_observations_type ON observations(type);
      CREATE INDEX idx_observations_created ON observations(created_at_epoch DESC);
    `,r=["id","memory_session_id","project","request","investigated","learned","completed","next_steps","files_read","files_edited","notes","prompt_number","discovery_tokens","created_at","created_at_epoch"],a=`
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
    `;try{e&&(this.db.run("DROP TRIGGER IF EXISTS observations_ai"),this.db.run("DROP TRIGGER IF EXISTS observations_ad"),this.db.run("DROP TRIGGER IF EXISTS observations_au"),this.db.run("DROP TABLE IF EXISTS observations_new"),this.recreateObservationsWithCascade(n,t,i)),s&&(this.db.run("DROP TRIGGER IF EXISTS session_summaries_ai"),this.db.run("DROP TRIGGER IF EXISTS session_summaries_ad"),this.db.run("DROP TRIGGER IF EXISTS session_summaries_au"),this.db.run("DROP TABLE IF EXISTS session_summaries_new"),this.recreateSessionSummariesWithCascade(a,r,_)),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(21,new Date().toISOString()),this.db.run("COMMIT"),this.db.run("PRAGMA foreign_keys = ON"),u.debug("DB","Successfully added ON UPDATE CASCADE to FK constraints")}catch(E){throw this.db.run("ROLLBACK"),this.db.run("PRAGMA foreign_keys = ON"),E instanceof Error?E:new Error(String(E))}}recreateObservationsWithCascade(e,s,t){this.db.run(e);let i=this.carryLiveColumnsOntoNewTable("observations","observations_new",s).map(r=>`"${r}"`).join(", ");this.db.run(`INSERT INTO observations_new (${i}) SELECT ${i} FROM observations`),this.db.run("DROP TABLE observations"),this.db.run("ALTER TABLE observations_new RENAME TO observations"),this.db.run(t),this.recreateFtsTriggersIfIndexed("observations")}recreateSessionSummariesWithCascade(e,s,t){this.db.run(e);let i=this.carryLiveColumnsOntoNewTable("session_summaries","session_summaries_new",s).map(r=>`"${r}"`).join(", ");this.db.run(`INSERT INTO session_summaries_new (${i}) SELECT ${i} FROM session_summaries`),this.db.run("DROP TABLE session_summaries"),this.db.run("ALTER TABLE session_summaries_new RENAME TO session_summaries"),this.db.run(t),this.recreateFtsTriggersIfIndexed("session_summaries")}addObservationContentHashColumn(){if(this.db.query("PRAGMA table_info(observations)").all().some(t=>t.name==="content_hash")){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(22,new Date().toISOString());return}this.db.run("ALTER TABLE observations ADD COLUMN content_hash TEXT"),this.db.run("UPDATE observations SET content_hash = substr(hex(randomblob(8)), 1, 16) WHERE content_hash IS NULL"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_content_hash ON observations(content_hash, created_at_epoch)"),u.debug("DB","Added content_hash column to observations table with backfill and index"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(22,new Date().toISOString())}addSessionCustomTitleColumn(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(23),t=this.db.query("PRAGMA table_info(sdk_sessions)").all().some(n=>n.name==="custom_title");e&&t||(t||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN custom_title TEXT"),u.debug("DB","Added custom_title column to sdk_sessions table")),e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(23,new Date().toISOString()))}addSessionPlatformSourceColumn(){let s=this.db.query("PRAGMA table_info(sdk_sessions)").all().some(r=>r.name==="platform_source"),n=this.db.query("PRAGMA index_list(sdk_sessions)").all().some(r=>r.name==="idx_sdk_sessions_platform_source");this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(24)&&s&&n||(s||(this.db.run(`ALTER TABLE sdk_sessions ADD COLUMN platform_source TEXT NOT NULL DEFAULT '${T}'`),u.debug("DB","Added platform_source column to sdk_sessions table")),this.db.run(`
      UPDATE sdk_sessions
      SET platform_source = '${T}'
      WHERE platform_source IS NULL OR platform_source = ''
    `),n||this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_platform_source ON sdk_sessions(platform_source)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(24,new Date().toISOString()))}addObservationModelColumns(){let e=this.db.query("PRAGMA table_info(observations)").all(),s=e.some(n=>n.name==="generated_by_model"),t=e.some(n=>n.name==="relevance_count");s&&t||(s||this.db.run("ALTER TABLE observations ADD COLUMN generated_by_model TEXT"),t||this.db.run("ALTER TABLE observations ADD COLUMN relevance_count INTEGER DEFAULT 0"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(26,new Date().toISOString()))}ensureSDKSessionsObservedColumns(){let e=this.db.query("PRAGMA table_info(sdk_sessions)").all(),s=e.some(n=>n.name==="observed_model"),t=e.some(n=>n.name==="observed_billing");s&&t||(s||this.db.run("ALTER TABLE sdk_sessions ADD COLUMN observed_model TEXT"),t||this.db.run("ALTER TABLE sdk_sessions ADD COLUMN observed_billing TEXT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(50,new Date().toISOString()))}ensureToolUsesTable(){lt(this.db),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(51,new Date().toISOString())}ensureWorkStateTable(){Ot(this.db),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(61,new Date().toISOString())}ensureProjectRecencyIndexes(){this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_project_nocase_recent ON observations(project COLLATE NOCASE, created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into_nocase_recent ON observations(merged_into_project COLLATE NOCASE, created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_project_nocase_recent ON session_summaries(project COLLATE NOCASE, created_at_epoch DESC)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into_nocase_recent ON session_summaries(merged_into_project COLLATE NOCASE, created_at_epoch DESC)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(63,new Date().toISOString())}ensureMergedIntoProjectCoveringIndexes(){this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into_nocase_project ON observations(merged_into_project COLLATE NOCASE, project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into_nocase_project ON session_summaries(merged_into_project COLLATE NOCASE, project)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(64,new Date().toISOString())}ensureHookSpoolConsumedTable(){this.db.run(`
      CREATE TABLE IF NOT EXISTS hook_spool_consumed (
        entry_key TEXT PRIMARY KEY,
        consumed_at_epoch_ms INTEGER NOT NULL
      )
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(62,new Date().toISOString())}isHookSpoolEntryConsumed(e){return this.db.prepare("SELECT 1 FROM hook_spool_consumed WHERE entry_key = ?").get(e)!=null}markHookSpoolEntryConsumed(e,s){this.db.prepare("INSERT INTO hook_spool_consumed (entry_key, consumed_at_epoch_ms) VALUES (?, ?) ON CONFLICT(entry_key) DO UPDATE SET consumed_at_epoch_ms = excluded.consumed_at_epoch_ms").run(e,s)}clearHookSpoolEntryConsumed(e){this.db.prepare("DELETE FROM hook_spool_consumed WHERE entry_key = ?").run(e)}pruneHookSpoolConsumedMarkersBefore(e){this.db.prepare("DELETE FROM hook_spool_consumed WHERE consumed_at_epoch_ms < ?").run(e)}ensureTelegramWrapupsTable(){this.db.run(`
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
    `),this.db.run("CREATE INDEX IF NOT EXISTS idx_telegram_wrapups_platform_content ON telegram_wrapups(platform_source, content_session_id)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(52,new Date().toISOString())}ensureReinforcementColumns(){let e=this.db.query("PRAGMA table_info(observations)").all();e.some(s=>s.name==="reinforcement_dates")||this.db.run("ALTER TABLE observations ADD COLUMN reinforcement_dates TEXT"),e.some(s=>s.name==="last_reinforced")||this.db.run("ALTER TABLE observations ADD COLUMN last_reinforced TEXT"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(an,new Date().toISOString())}dropWriteOnlyUserPromptsFtsAndScopeFtsUpdateTriggers(){let e=this.db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type = 'trigger'
        AND name IN ('observations_au', 'session_summaries_au')
        AND sql NOT LIKE '%UPDATE OF%'
    `).all().map(t=>t.name),s=this.db.prepare(`
      SELECT name FROM sqlite_master
      WHERE name IN ('user_prompts_fts', 'user_prompts_ai', 'user_prompts_ad', 'user_prompts_au')
    `).all();if(e.length>0||s.length>0){this.db.run("BEGIN TRANSACTION");try{e.includes("observations_au")&&(this.db.run("DROP TRIGGER observations_au"),this.db.run(ae)),e.includes("session_summaries_au")&&(this.db.run("DROP TRIGGER session_summaries_au"),this.db.run(_e)),this.db.run("DROP TRIGGER IF EXISTS user_prompts_ai"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_ad"),this.db.run("DROP TRIGGER IF EXISTS user_prompts_au"),this.db.run("DROP TABLE IF EXISTS user_prompts_fts"),this.db.run("COMMIT")}catch(t){throw this.db.run("ROLLBACK"),u.error("DB","Failed to scope FTS update triggers / drop user_prompts_fts, rolled back",{},t instanceof Error?t:new Error(String(t))),t}u.info("DB","Scoped FTS update triggers to indexed columns and dropped the write-only user_prompts_fts",{rescopedTriggers:e,droppedUserPromptsFts:s.length>0})}this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(54,new Date().toISOString())}ensureMergedIntoProjectColumns(){this.db.query("PRAGMA table_info(observations)").all().some(t=>t.name==="merged_into_project")||this.db.run("ALTER TABLE observations ADD COLUMN merged_into_project TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into ON observations(merged_into_project)"),this.db.query("PRAGMA table_info(session_summaries)").all().some(t=>t.name==="merged_into_project")||this.db.run("ALTER TABLE session_summaries ADD COLUMN merged_into_project TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into ON session_summaries(merged_into_project)")}requeuePromptsDeadLetteredForSize(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(60))return;let s="canonical content: body exceeds % UTF-8 bytes";this.db.transaction(()=>{let t=this.db.prepare(`
        UPDATE user_prompts SET synced_at = NULL
        WHERE synced_at = -1 AND origin_device_id IS NULL
          AND CAST(id AS TEXT) IN (
            SELECT origin_local_id FROM sync_dead_letter
            WHERE lane = 'content' AND kind = 'prompt' AND reason LIKE ?
          )
      `).run(s);this.db.prepare(`
        DELETE FROM sync_dead_letter WHERE lane = 'content' AND kind = 'prompt' AND reason LIKE ?
      `).run(s),t.changes>0&&u.info("DB","Re-queued prompts quarantined for size before the cloud-sync prompt clamp",{prompts:t.changes}),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(60,new Date().toISOString())})()}ensureSessionProjectKeySourceColumn(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(s=>s.name==="project_key_source")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN project_key_source TEXT"),u.debug("DB","Added project_key_source column to sdk_sessions table")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(59,new Date().toISOString())}ensureSessionCwdColumn(){this.db.query("PRAGMA table_info(sdk_sessions)").all().some(s=>s.name==="cwd")||(this.db.run("ALTER TABLE sdk_sessions ADD COLUMN cwd TEXT"),u.debug("DB","Added cwd column to sdk_sessions table (#2864)")),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_cwd ON sdk_sessions(cwd)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(53,new Date().toISOString())}ensureProjectNocaseIndexes(){this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_project_nocase ON observations(project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_merged_into_nocase ON observations(merged_into_project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_project_nocase ON session_summaries(project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_summaries_merged_into_nocase ON session_summaries(merged_into_project COLLATE NOCASE)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_sdk_sessions_project_nocase ON sdk_sessions(project COLLATE NOCASE)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(55,new Date().toISOString())}ensureAdvisorCallsTable(){this.db.run(`
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
    `),this.db.run("CREATE UNIQUE INDEX IF NOT EXISTS idx_advisor_calls_tool_use ON advisor_calls(tool_use_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_advisor_calls_session ON advisor_calls(session_db_id)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_advisor_calls_project ON advisor_calls(project)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_advisor_calls_occurred ON advisor_calls(occurred_at_epoch DESC)"),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(58,new Date().toISOString())}recordAdvisorCall(e){let s=new Date,t=this.db.prepare(`
      INSERT OR IGNORE INTO advisor_calls
      (session_db_id, content_session_id, project, platform_source, tool_use_id, advisor_model, cwd, last_user_message, transcript_path, transcript_byte_offset, advice, occurred_at_epoch, created_at, created_at_epoch)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(e.sessionDbId,e.contentSessionId,e.project,e.platformSource,e.toolUseId,e.advisorModel??null,e.cwd??null,e.lastUserMessage??null,e.transcriptPath??null,e.transcriptByteOffset??null,e.advice,e.occurredAtEpoch,s.toISOString(),s.getTime());return t.changes>0?{id:Number(t.lastInsertRowid),inserted:!0}:{id:this.db.prepare("SELECT id FROM advisor_calls WHERE tool_use_id = ?").get(e.toolUseId)?.id??0,inserted:!1}}getAdvisorCalls(e,s,t,n){let i="SELECT * FROM advisor_calls",r=[],a=[];t?(a.push("project = ?"),r.push(t)):(a.push("project != ?"),r.push(Z)),n&&(a.push("platform_source = ?"),r.push(n)),i+=` WHERE ${a.join(" AND ")}`,i+=" ORDER BY occurred_at_epoch DESC LIMIT ? OFFSET ?",r.push(s+1,e);let _=this.db.prepare(i).all(...r);return{items:_.slice(0,s),hasMore:_.length>s,offset:e,limit:s}}getAdvisorCallById(e){return this.db.prepare("SELECT * FROM advisor_calls WHERE id = ?").get(e)??null}addObservationSubagentColumns(){let e=this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(27),s=this.db.query("PRAGMA table_info(observations)").all(),t=s.some(r=>r.name==="agent_type"),n=s.some(r=>r.name==="agent_id");t||this.db.run("ALTER TABLE observations ADD COLUMN agent_type TEXT"),n||this.db.run("ALTER TABLE observations ADD COLUMN agent_id TEXT"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_agent_type ON observations(agent_type)"),this.db.run("CREATE INDEX IF NOT EXISTS idx_observations_agent_id ON observations(agent_id)");let i=this.db.query("PRAGMA table_info(pending_messages)").all();if(i.length>0){let r=i.some(_=>_.name==="agent_type"),a=i.some(_=>_.name==="agent_id");r||this.db.run("ALTER TABLE pending_messages ADD COLUMN agent_type TEXT"),a||this.db.run("ALTER TABLE pending_messages ADD COLUMN agent_id TEXT")}e||this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(27,new Date().toISOString())}ensurePendingMessagesToolUseIdColumn(){if(this.db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='pending_messages'").all().length===0){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(28,new Date().toISOString());return}this.db.query("PRAGMA table_info(pending_messages)").all().some(n=>n.name==="tool_use_id")||this.db.run("ALTER TABLE pending_messages ADD COLUMN tool_use_id TEXT"),this.db.run("BEGIN TRANSACTION");try{this.dedupePendingMessagesByToolUseId(),this.db.run("COMMIT")}catch(n){this.db.run("ROLLBACK");let i=n instanceof Error?n:new Error(String(n));throw u.error("DB","Failed to de-dupe pending_messages by tool_use_id, rolled back",{},i),n}}dedupePendingMessagesByToolUseId(){this.db.run(`
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
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(28,new Date().toISOString())}addObservationsUniqueContentHashIndex(){if(this.db.prepare("SELECT version FROM schema_versions WHERE version = ?").get(29))return;let s=this.db.query("PRAGMA table_info(observations)").all(),t=s.some(i=>i.name==="memory_session_id"),n=s.some(i=>i.name==="content_hash");if(!t||!n){this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(29,new Date().toISOString());return}this.db.run("BEGIN TRANSACTION");try{this.dedupeObservationsByContentHash(),this.db.run("COMMIT")}catch(i){this.db.run("ROLLBACK");let r=i instanceof Error?i:new Error(String(i));throw u.error("DB","Failed to de-dupe observations by content_hash, rolled back",{},r),i}}dedupeObservationsByContentHash(){this.db.run(`
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
    `),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(29,new Date().toISOString())}addObservationsMetadataColumn(){this.db.query("PRAGMA table_info(observations)").all().some(t=>t.name==="metadata")||(this.db.run("ALTER TABLE observations ADD COLUMN metadata TEXT"),u.debug("DB","Added metadata column to observations table (#2116)")),this.db.prepare("INSERT OR IGNORE INTO schema_versions (version, applied_at) VALUES (?, ?)").run(30,new Date().toISOString())}updateMemorySessionId(e,s){let t=this.db.prepare(`
      SELECT memory_session_id
      FROM sdk_sessions
      WHERE id = ?
    `).get(e);!t||t.memory_session_id===s||this.db.transaction(()=>{this.db.prepare(`
        UPDATE sdk_sessions
        SET memory_session_id = ?
        WHERE id = ?
      `).run(s,e),this.db.prepare(`
        UPDATE tool_uses
        SET memory_session_id = ?
        WHERE session_db_id = ?
      `).run(s,e)})()}markSessionCompleted(e){let s=Date.now(),t=new Date(s).toISOString();this.db.prepare(`
      UPDATE sdk_sessions
      SET status = 'completed', completed_at = ?, completed_at_epoch = ?
      WHERE id = ?
    `).run(t,s,e)}reopenCompletedSession(e){this.db.prepare(`
      UPDATE sdk_sessions
      SET status = 'active', completed_at = NULL, completed_at_epoch = NULL
      WHERE id = ? AND status = 'completed'
    `).run(e)}ensureMemorySessionIdRegistered(e,s,t){let n=this.db.prepare(`
      SELECT id, memory_session_id, worker_port FROM sdk_sessions WHERE id = ?
    `).get(e);if(!n)throw new Error(`Session ${e} not found in sdk_sessions`);return n.memory_session_id===null?(this.db.prepare(`
        UPDATE sdk_sessions SET memory_session_id = ? WHERE id = ?
      `).run(s,e),u.info("DB","Registered memory_session_id before storage (FK fix)",{sessionDbId:e,newId:s})):n.memory_session_id!==s&&u.debug("DB","Keeping the registered memory_session_id",{sessionDbId:e,registered:n.memory_session_id,offered:s}),typeof t=="number"&&n.worker_port!==t&&this.db.prepare(`
        UPDATE sdk_sessions SET worker_port = ? WHERE id = ?
      `).run(t,e),n.memory_session_id??s}getProjectReadKeys(e){return rt(this.db,e)}getAllProjects(e){let s=e?N(e):void 0,t=`
      SELECT DISTINCT project
      FROM sdk_sessions
      WHERE project IS NOT NULL AND project != ''
        AND project != ?
    `,n=[Z];return s&&(t+=" AND COALESCE(platform_source, ?) = ?",n.push(T,s)),t+=" ORDER BY project ASC",this.db.prepare(t).all(...n).map(r=>r.project)}getProjectCatalog(){let e=this.db.prepare(`
      SELECT
        COALESCE(platform_source, '${T}') as platform_source,
        project,
        MAX(started_at_epoch) as latest_epoch
      FROM sdk_sessions
      WHERE project IS NOT NULL AND project != ''
        AND project != ?
      GROUP BY COALESCE(platform_source, '${T}'), project
      ORDER BY latest_epoch DESC
    `).all(Z),s=[],t=new Set,n={};for(let r of e){let a=N(r.platform_source);n[a]||(n[a]=[]),n[a].includes(r.project)||n[a].push(r.project),t.has(r.project)||(t.add(r.project),s.push(r.project))}let i=dt(Object.keys(n));return{projects:s,sources:i,projectsBySource:Object.fromEntries(i.map(r=>[r,n[r]||[]]))}}getSessionCatalog(e={}){let s=Math.min(Math.max(Math.trunc(e.limit??nn),1),rn),t=Math.max(Math.trunc(e.offset??0),0),n=`
      SELECT
        s.content_session_id,
        s.project,
        COALESCE(s.platform_source, '${T}') as platform_source,
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
    `,i=[Z];e.project&&(n+=" AND s.project COLLATE NOCASE = ?",i.push(e.project)),e.platformSource&&(n+=` AND COALESCE(s.platform_source, '${T}') = ?`,i.push(N(e.platformSource))),n+=" ORDER BY s.started_at_epoch DESC, s.id DESC LIMIT ? OFFSET ?",i.push(s+1,t);let r=this.db.prepare(n).all(...i);return{sessions:r.slice(0,s),hasMore:r.length>s}}getUserPromptById(e){return this.db.prepare(`
      SELECT
        up.*,
        s.memory_session_id,
        s.project,
        COALESCE(s.platform_source, '${T}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.id = ?
    `).get(e)}findRecentDuplicateUserPrompt(e,s,t,n){return jt(this.db,e,re(s),t,this.resolvePromptSessionDbId(e,n)??void 0)}getRecentSessionsWithStatus(e,s=3,t){let n=[e],i="";return t&&(i=`AND COALESCE(NULLIF(s.platform_source, ''), '${T}') = ?`,n.push(N(t))),n.push(s),this.db.prepare(`
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
        ${i}
        GROUP BY s.memory_session_id
        ORDER BY s.started_at_epoch DESC
        LIMIT ?
      )
      ORDER BY started_at_epoch ASC
    `).all(...n)}getObservationsForSession(e,s){let t=[e],n="";return s&&(n=`
        AND EXISTS (
          SELECT 1
          FROM sdk_sessions s
          WHERE s.memory_session_id = observations.memory_session_id
            AND COALESCE(NULLIF(s.platform_source, ''), '${T}') = ?
        )
      `,t.push(N(s))),this.db.prepare(`
      SELECT title, subtitle, type, prompt_number
      FROM observations
      WHERE memory_session_id = ?
      ${n}
      ORDER BY created_at_epoch ASC
    `).all(...t)}getObservationById(e,s){return s?this.db.prepare(`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id
      WHERE o.id = ?
        AND COALESCE(NULLIF(s.platform_source, ''), '${T}') = ?
    `).get(e,N(s))||null:this.db.prepare(`
        SELECT *
        FROM observations
        WHERE id = ?
      `).get(e)||null}upsertToolUse(e){return pt(this.db,e)}linkToolUsesToObservation(e){return mt(this.db,e)}getToolUsesByIds(e,s={}){return St(this.db,e,s)}queryToolUses(e={}){return At(this.db,e)}appendWorkStateEntry(e){let s=ft(this.db,e);return $({projects:[e.project]},"appendWorkStateEntry"),s}getWorkStateEntries(e,s){let t=Rt(this.db,this.getProjectReadKeys(e),s),n=a=>a.replace(/[A-Z]/g,_=>_.toLowerCase()),i=new Set(e.map(n)),r=e.at(-1);return t.map(a=>r&&i.has(n(a.project))?{...a,scope_project:r}:a)}countToolUses(e={}){return gt(this.db,e)}getObservationsByIds(e,s={}){if(e.length===0)return[];let{orderBy:t="date_desc",platformSource:n,type:i,concepts:r,files:a}=s,_=Ye(s.limit),E=F(s),d=t==="relevance",c=t==="date_asc"?"ASC":"DESC",l=d?"":`ORDER BY o.created_at_epoch ${c}, o.id ${c}`,m=_&&!d?"LIMIT ?":"",O=e.map(()=>"?").join(","),h=[...e],f=[];if(E.length>0){let A=w("o",E,{includeMerged:!0});f.push(A.sql),h.push(...A.params)}if(n&&(f.push(`COALESCE(NULLIF(s.platform_source, ''), '${T}') = ?`),h.push(N(n))),i)if(Array.isArray(i)){let A=i.map(()=>"?").join(",");f.push(`o.type IN (${A})`),h.push(...i)}else f.push("o.type = ?"),h.push(i);if(r){let A=Array.isArray(r)?r:[r],D=`CASE WHEN json_valid(o.concepts) THEN CASE
        WHEN json_type(o.concepts) = 'array' THEN o.concepts
        WHEN json_type(o.concepts) = 'text' THEN json_array(json_extract(o.concepts, '$'))
        ELSE json_array(o.concepts) END ELSE json_array(o.concepts) END`,g=A.map(()=>`EXISTS (SELECT 1 FROM json_each(${D}) WHERE type = 'text' AND value = ?)`);g.length>0&&(h.push(...A),f.push(`(${g.join(" OR ")})`))}if(a){let A=Array.isArray(a)?a:[a],D=y=>`CASE WHEN json_valid(${y}) THEN CASE WHEN json_type(${y}) = 'array' THEN ${y} ELSE '[]' END ELSE '[]' END`,g=A.map(()=>`(EXISTS (SELECT 1 FROM json_each(${D("o.files_read")}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\') OR EXISTS (SELECT 1 FROM json_each(${D("o.files_modified")}) WHERE type = 'text' AND value LIKE ? ESCAPE '\\'))`);g.length>0&&(A.forEach(y=>{let x=y.replace(/[\\%_]/g,"\\$&");h.push(`%${x}%`,`%${x}%`)}),f.push(`(${g.join(" OR ")})`))}let I=f.length>0?`WHERE o.id IN (${O}) AND ${f.join(" AND ")}`:`WHERE o.id IN (${O})`;m&&h.push(_);let p=this.db.prepare(`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions s ON s.memory_session_id = o.memory_session_id
      ${I}
      ${l}
      ${m}
    `).all(...h);if(!d)return p;let S=new Map(p.map(A=>[A.id,A])),U=e.map(A=>S.get(A)).filter(A=>!!A);return _?U.slice(0,_):U}getSummaryForSession(e,s){let t=[e],n="";return s&&(n=`
        AND EXISTS (
          SELECT 1
          FROM sdk_sessions sdk
          WHERE sdk.memory_session_id = session_summaries.memory_session_id
            AND COALESCE(NULLIF(sdk.platform_source, ''), '${T}') = ?
        )
      `,t.push(N(s))),this.db.prepare(`
      SELECT
        request, investigated, learned, completed, next_steps,
        files_read, files_edited, notes, prompt_number, created_at,
        created_at_epoch
      FROM session_summaries
      WHERE memory_session_id = ?
      ${n}
      ORDER BY created_at_epoch DESC, id DESC
      LIMIT 1
    `).get(...t)||null}getSessionById(e){return this.db.prepare(`
      SELECT id, content_session_id, memory_session_id, project,
             COALESCE(platform_source, '${T}') as platform_source,
             user_prompt, custom_title, status,
             observed_model, observed_billing
      FROM sdk_sessions
      WHERE id = ?
      LIMIT 1
    `).get(e)||null}findSessionDbIdByContentSessionId(e,s){return this.db.prepare(`
      SELECT id
      FROM sdk_sessions
      WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
        AND content_session_id = ?
      LIMIT 1
    `).get(T,N(s),e)?.id??null}claimTelegramWrapup({platformSource:e,contentSessionId:s,project:t,routeKey:n,summaryCreatedAtEpoch:i}){let r=Date.now();return this.db.prepare(`
      INSERT OR IGNORE INTO telegram_wrapups
      (platform_source, content_session_id, project, route_key, summary_created_at_epoch, status, claimed_at_epoch, sent_at_epoch)
      VALUES (?, ?, ?, ?, ?, 'claimed', ?, NULL)
    `).run(N(e),s,t,n,i,r).changes===1?!0:this.db.prepare(`
      UPDATE telegram_wrapups
      SET summary_created_at_epoch = ?, claimed_at_epoch = ?, sent_at_epoch = NULL
      WHERE platform_source = ?
        AND content_session_id = ?
        AND project = ?
        AND route_key = ?
        AND status = 'claimed'
        AND claimed_at_epoch <= ?
    `).run(i,r,N(e),s,t,n,r-is).changes===1}markTelegramWrapupSent({platformSource:e,contentSessionId:s,project:t,routeKey:n}){this.db.prepare(`
      UPDATE telegram_wrapups
      SET status = 'sent', sent_at_epoch = ?
      WHERE platform_source = ?
        AND content_session_id = ?
        AND project = ?
        AND route_key = ?
        AND status = 'claimed'
    `).run(Date.now(),N(e),s,t,n)}releaseTelegramWrapupClaim({platformSource:e,contentSessionId:s,project:t,routeKey:n}){this.db.prepare(`
      DELETE FROM telegram_wrapups
      WHERE platform_source = ?
        AND content_session_id = ?
        AND project = ?
        AND route_key = ?
        AND status = 'claimed'
    `).run(N(e),s,t,n)}setSessionObservedMetadata(e,s,t){this.db.prepare(`
      UPDATE sdk_sessions
      SET observed_model = COALESCE(?, observed_model),
          observed_billing = COALESCE(?, observed_billing)
      WHERE id = ?
    `).run(s||null,t||null,e)}getSdkSessionsBySessionIds(e,s=[]){if(e.length===0&&s.length===0)return[];let t=[...new Set(e),...new Set(s)],n=new Map;for(let i=0;i<t.length;i+=500){let r=t.slice(i,i+500),a=r.filter(c=>typeof c=="string"),_=r.filter(c=>typeof c=="number"),E=[];a.length&&E.push(`memory_session_id IN (${a.map(()=>"?").join(",")})`),_.length&&E.push(`id IN (SELECT session_db_id FROM user_prompts WHERE id IN (${_.map(()=>"?").join(",")}))`);let d=this.db.prepare(`
        SELECT id, content_session_id, memory_session_id, project,
               COALESCE(platform_source, '${T}') as platform_source,
               user_prompt, custom_title,
               started_at, started_at_epoch, completed_at, completed_at_epoch, status
        FROM sdk_sessions
        WHERE ${E.join(" OR ")}
        ORDER BY started_at_epoch DESC
      `);for(let c of d.all(...r))n.set(c.id,c)}return[...n.values()].sort((i,r)=>r.started_at_epoch-i.started_at_epoch)}getPromptNumberFromUserPrompts(e,s,t){let n=this.resolvePromptSessionDbId(e,s),i=n!==null?"session_db_id = ?":"content_session_id = ?",r=n!==null?n:e;return t!==void 0?this.db.prepare(`
        SELECT COALESCE(MAX(prompt_number), 0) as count FROM user_prompts WHERE ${i} AND created_at_epoch <= ?
      `).get(r,t).count:this.db.prepare(`
      SELECT COALESCE(MAX(prompt_number), 0) as count FROM user_prompts WHERE ${i}
    `).get(r).count}getLatestPromptTextFromUserPrompts(e,s){let t=this.resolvePromptSessionDbId(e,s),n=t!==null?"session_db_id = ?":"content_session_id = ?",i=t!==null?t:e;return this.db.prepare(`
      SELECT prompt_text
      FROM user_prompts
      WHERE ${n}
        AND prompt_text IS NOT NULL
        AND length(trim(prompt_text)) > 0
      ORDER BY prompt_number DESC, created_at_epoch DESC
      LIMIT 1
    `).get(i)?.prompt_text??null}createSDKSession(e,s,t,n,i){let r=new Date,a=r.getTime(),_=i?N(i):T,E=re(t),d=this.db.prepare(`
      SELECT id, platform_source
      FROM sdk_sessions
      WHERE COALESCE(NULLIF(platform_source, ''), ?) = ?
        AND content_session_id = ?
    `).get(T,_,e);if(d)return s&&this.db.prepare(`
          UPDATE sdk_sessions SET project = ?
          WHERE id = ? AND (project IS NULL OR project = '')
        `).run(s,d.id),E&&E!==Xe&&this.db.prepare(`
          UPDATE sdk_sessions SET user_prompt = ?
          WHERE id = ? AND (user_prompt IS NULL OR user_prompt = '' OR user_prompt = ?)
        `).run(E,d.id,Xe),n&&this.db.prepare(`
          UPDATE sdk_sessions SET custom_title = ?
          WHERE id = ? AND custom_title IS NULL
        `).run(n,d.id),d.id;let c=this.db.prepare(`
      INSERT INTO sdk_sessions
      (content_session_id, memory_session_id, project, platform_source, user_prompt, custom_title, started_at, started_at_epoch, status)
      VALUES (?, NULL, ?, ?, ?, ?, ?, ?, 'active')
    `).run(e,s,_,E,n||null,r.toISOString(),a);return Number(c.lastInsertRowid)}setSessionCwd(e,s,t){s.trim()&&this.db.prepare("UPDATE sdk_sessions SET cwd = ?, project_key_source = ? WHERE id = ? AND cwd IS NULL").run(s,t??null,e)}getSessionCwd(e){return this.db.prepare("SELECT cwd FROM sdk_sessions WHERE id = ?").get(e)?.cwd??null}saveUserPrompt(e,s,t,n,i,r){let a=new Date,_=a.getTime(),E=re(t),d=this.resolvePromptSessionDbId(e,n);return this.db.prepare(`
      INSERT INTO user_prompts
      (session_db_id, content_session_id, prompt_number, prompt_text, created_at, created_at_epoch, native_prompt_id, native_prompt_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(d,e,s,E,a.toISOString(),_,i??null,r??null).lastInsertRowid}saveNativeUserPrompt(e,s,t,n,i=n){if(!t||t.length>256||/[\s\x00-\x1f\x7f]/.test(t))throw new Error("Invalid native prompt identity");let r=re(n),a=(0,os.createHash)("sha256").update(ge(i).trim()).digest("hex");return this.db.transaction(()=>{let _=this.db.prepare(`SELECT id, prompt_number, native_prompt_hash FROM user_prompts
        WHERE session_db_id = ? AND native_prompt_id = ?`).get(s,t);if(_){if(_.native_prompt_hash!==a)throw new Error("Native prompt identity was reused with different text");return{id:_.id,promptNumber:_.prompt_number,duplicate:!0}}let E=this.getPromptNumberFromUserPrompts(e,s)+1;return this.reopenCompletedSession(s),{id:this.saveUserPrompt(e,E,r,s,t,a),promptNumber:E,duplicate:!1}}).immediate()}getUserPrompt(e,s,t){let n=this.resolvePromptSessionDbId(e,t);return n!==null?this.db.prepare(`
        SELECT prompt_text
        FROM user_prompts
        WHERE session_db_id = ? AND prompt_number = ?
        LIMIT 1
      `).get(n,s)?.prompt_text??null:this.db.prepare(`
      SELECT prompt_text
      FROM user_prompts
      WHERE content_session_id = ? AND prompt_number = ?
      LIMIT 1
    `).get(e,s)?.prompt_text??null}dedupConfig(){let e=K.loadFromFile(ue),s=(n,i)=>{let r=Number(e[n]);return Number.isFinite(r)?r:i},t=(n,i)=>Math.trunc(s(n,i));return{enabled:e.CLAUDE_MEM_DEDUP_ENABLED==="true",cosineThreshold:s("CLAUDE_MEM_DEDUP_COSINE_THRESHOLD",.8),idfVetoDf:t("CLAUDE_MEM_DEDUP_IDF_VETO_DF",10),minSharedTokens:t("CLAUDE_MEM_DEDUP_MIN_SHARED_TOKENS",2),maxScan:t("CLAUDE_MEM_DEDUP_MAX_SCAN",2e3),maxBackfillRows:t("CLAUDE_MEM_DEDUP_MAX_BACKFILL_ROWS",5e4),minProjectDocs:t("CLAUDE_MEM_DEDUP_MIN_PROJECT_DOCS",10)}}listDedupCandidates(e,s=100,t){let n="SELECT c.id, c.project, c.method, c.score, c.status, c.created_at_epoch, c.observation_id, o1.title AS observation_title, c.duplicate_of_id, o2.title AS duplicate_of_title FROM observation_dedup_candidates c JOIN observations o1 ON o1.id = c.observation_id JOIN observations o2 ON o2.id = c.duplicate_of_id ",i="(? IS NULL OR c.status = ?) ",r="ORDER BY c.score DESC, c.id DESC LIMIT ?",a=t??null;return e?this.db.prepare(`${n}WHERE c.project = ? AND ${i}${r}`).all(e,a,a,s):this.db.prepare(`${n}WHERE ${i}${r}`).all(a,a,s)}resolveDedupCandidate(e,s){return this.db.prepare("UPDATE observation_dedup_candidates SET status = ? WHERE id = ?").run(s,e).changes>0}isDedupEnabled(){return this.dedupConfig().enabled}runDedupScan(){return Ht(this.db,this.dedupConfig())}maintainDedupOnInsert(e,s,t,n){Pt(this.db,e,t),Gt(this.db,e,n.minProjectDocs)&&$t(this.db,e,s,t,n)}storeObservation(e,s,t,n,i=0,r,a,_={}){if(!ye(t.title))throw new Error("storeObservation requires a non-empty title");let E=this.storeObservations(e,s,[t],null,n,i,r,a,_);return{id:E.observationIds[0],createdAtEpoch:E.createdAtEpoch,mergedIntoExisting:E.mergedIntoExisting[0]??!1}}storeSummary(e,s,t,n,i=0,r){let a=r??Date.now(),_=new Date(a).toISOString(),d=this.db.prepare(`
      INSERT INTO session_summaries
      (memory_session_id, project, request, investigated, learned, completed,
       next_steps, files_read, files_edited, notes, prompt_number, discovery_tokens, created_at, created_at_epoch)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(e,s,t.request,t.investigated,t.learned,t.completed,t.next_steps,JSON.stringify(t.files_read??[]),JSON.stringify(t.files_edited??[]),t.notes,n||null,i,_,a);return $({projects:[s]},"storeSummary"),{id:Number(d.lastInsertRowid),createdAtEpoch:a}}storeObservations(e,s,t,n,i,r=0,a,_,E={}){let d=a??Date.now(),c=new Date(d).toISOString(),l=Et(d),m=new Date(d),O=this.dedupConfig(),h=N(this.db.prepare("SELECT platform_source FROM sdk_sessions WHERE memory_session_id = ? LIMIT 1").get(e)?.platform_source),I=this.db.transaction(()=>{let R=[],p=[],S=[],U=this.db.prepare(`
        INSERT INTO observations
        (memory_session_id, project, type, title, subtitle, facts, narrative, concepts,
         files_read, files_modified, prompt_number, discovery_tokens, agent_type, agent_id, content_hash, created_at, created_at_epoch,
         generated_by_model, metadata, title_norm_key, reinforcement_dates, last_reinforced)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(memory_session_id, content_hash) DO NOTHING
        RETURNING id
      `),A=this.db.prepare("SELECT id FROM observations WHERE memory_session_id = ? AND content_hash = ?");for(let g of t){if(!ye(g.title)){u.debug("DB","Skipping observation with empty title");continue}let y=it(e,g.title,g.narrative),x=Se(s,h,g.title,te(g.agent_id,g.agent_type));if(O.enabled){let Re=A.get(e,y);if(Re){me(this.db,Re.id,m),R.push(Re.id),p.push(!1);continue}let Ee=E.skipTitleDedup?null:wt(this.db,s,x);if(Ee){this.db.prepare("UPDATE observations SET occurrence_count = occurrence_count + 1 WHERE id = ?").run(Ee.id),me(this.db,Ee.id,m),R.push(Ee.id),p.push(!0);continue}}let J=U.get(e,s,g.type,g.title,g.subtitle,JSON.stringify(g.facts),g.narrative,JSON.stringify(g.concepts),JSON.stringify(g.files_read),JSON.stringify(g.files_modified),i||null,r,g.agent_type??null,g.agent_id??null,y,c,d,_||null,g.metadata??null,x,l.dates,l.lastReinforced);if(J){O.enabled&&this.maintainDedupOnInsert(s,J.id,g.title,O),R.push(J.id),p.push(!1),S.push(J.id);continue}let z=A.get(e,y);if(!z)throw new Error(`storeObservations: ON CONFLICT without existing row for content_hash=${y}`);me(this.db,z.id,m),R.push(z.id),p.push(!1)}let D=null;if(n){let g=as(t),y=n.files_read??g.files_read,x=n.files_edited??g.files_edited,z=this.db.prepare(`
          INSERT INTO session_summaries
          (memory_session_id, project, request, investigated, learned, completed,
           next_steps, files_read, files_edited, notes, prompt_number, discovery_tokens, created_at, created_at_epoch)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(e,s,n.request,n.investigated,n.learned,n.completed,n.next_steps,JSON.stringify(y),JSON.stringify(x),n.notes,i||null,r,c,d);D=Number(z.lastInsertRowid)}return{observationIds:R,mergedIntoExisting:p,insertedObservationIds:S,summaryId:D,createdAtEpoch:d}})();return $({projects:[s]},"storeObservations"),I}updateDiscoveryTokens(e,s,t){e.length===0&&s===null||this.db.transaction(()=>{let n=this.db.prepare("UPDATE observations SET discovery_tokens = ? WHERE id = ?");for(let i of e)n.run(t,i);s!==null&&this.db.prepare("UPDATE session_summaries SET discovery_tokens = ? WHERE id = ?").run(t,s)})()}getSessionSummariesByIds(e,s={}){if(e.length===0)return[];let{orderBy:t="date_desc",platformSource:n}=s,i=Ye(s.limit),r=F(s),a=t==="relevance",_=t==="date_asc"?"ASC":"DESC",E=a?"":`ORDER BY ss.created_at_epoch ${_}, ss.id ${_}`,d=i&&!a?"LIMIT ?":"",c=e.map(()=>"?").join(","),l=[...e],m=[];if(r.length>0){let p=w("ss",r,{includeMerged:!0});m.push(p.sql),l.push(...p.params)}n&&(m.push(`COALESCE(NULLIF(s.platform_source, ''), '${T}') = ?`),l.push(N(n)));let O=m.length>0?`AND ${m.join(" AND ")}`:"";d&&l.push(i);let f=this.db.prepare(`
      SELECT ss.*
      FROM session_summaries ss
      LEFT JOIN sdk_sessions s ON s.memory_session_id = ss.memory_session_id
      WHERE ss.id IN (${c}) ${O}
      ${E}
      ${d}
    `).all(...l);if(!a)return f;let I=new Map(f.map(p=>[p.id,p])),R=e.map(p=>I.get(p)).filter(p=>!!p);return i?R.slice(0,i):R}getUserPromptsByIds(e,s={}){if(e.length===0)return[];let{orderBy:t="date_desc",platformSource:n}=s,i=Ye(s.limit),r=F(s),a=t==="relevance",_=t==="date_asc"?"ASC":"DESC",E=a?"":`ORDER BY up.created_at_epoch ${_}, up.id ${_}`,d=i&&!a?"LIMIT ?":"",c=e.map(()=>"?").join(","),l=[...e],m=[];if(r.length>0){let p=w("s",r,{includeMerged:!1});m.push(p.sql),l.push(...p.params)}n&&(m.push(`COALESCE(NULLIF(s.platform_source, ''), '${T}') = ?`),l.push(N(n)));let O=m.length>0?`AND ${m.join(" AND ")}`:"";d&&l.push(i);let f=this.db.prepare(`
      SELECT
        up.*,
        s.project,
        s.memory_session_id,
        COALESCE(NULLIF(s.platform_source, ''), '${T}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.id IN (${c}) ${O}
      ${E}
      ${d}
    `).all(...l);if(!a)return f;let I=new Map(f.map(p=>[p.id,p])),R=e.map(p=>I.get(p)).filter(p=>!!p);return i?R.slice(0,i):R}getTimelineAroundTimestamp(e,s=10,t=10,n,i){return this.getTimelineAroundObservation(null,e,s,t,n,i)}getTimelineAroundObservation(e,s,t=10,n=10,i,r){let a=r?N(r):void 0,_=(S,U,A=!1)=>{let D=[],g=[];return i&&(A?(D.push(`(${S}.project COLLATE NOCASE = ? OR ${S}.merged_into_project COLLATE NOCASE = ?)`),g.push(i,i)):(D.push(`${S}.project COLLATE NOCASE = ?`),g.push(i))),a&&(D.push(`COALESCE(NULLIF(${U}.platform_source, ''), '${T}') = ?`),g.push(a)),{clause:D.length>0?`AND ${D.join(" AND ")}`:"",params:g}},E=_("o","src",!0),d=_("ss","src",!0),c=_("s","s"),l,m;if(e!==null){let S=`
        SELECT o.id, o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE (o.created_at_epoch, o.id) <= (?, ?) ${E.clause}
        ORDER BY o.created_at_epoch DESC
        LIMIT ?
      `,U=`
        SELECT o.id, o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE (o.created_at_epoch, o.id) >= (?, ?) ${E.clause}
        ORDER BY o.created_at_epoch ASC
        LIMIT ?
      `;try{let A=this.db.prepare(S).all(s,e,...E.params,t+1),D=this.db.prepare(U).all(s,e,...E.params,n+1);if(A.length===0&&D.length===0)return{observations:[],sessions:[],prompts:[]};l=A.length>0?A[A.length-1].created_at_epoch:s,m=D.length>0?D[D.length-1].created_at_epoch:s}catch(A){return A instanceof Error?u.error("DB","Error getting boundary observations",{project:i},A):u.error("DB","Error getting boundary observations with non-Error",{},new Error(String(A))),{observations:[],sessions:[],prompts:[]}}}else{let S=`
        SELECT o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.created_at_epoch < ? ${E.clause}
        ORDER BY o.created_at_epoch DESC
        LIMIT ?
      `,U=`
        SELECT o.created_at_epoch
        FROM observations o
        LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
        WHERE o.created_at_epoch > ? ${E.clause}
        ORDER BY o.created_at_epoch ASC
        LIMIT ?
      `;try{let A=this.db.prepare(S).all(s,...E.params,t),D=this.db.prepare(U).all(s,...E.params,n);l=A.length>0?A[A.length-1].created_at_epoch:s,m=D.length>0?D[D.length-1].created_at_epoch:s}catch(A){return A instanceof Error?u.error("DB","Error getting boundary timestamps",{project:i},A):u.error("DB","Error getting boundary timestamps with non-Error",{},new Error(String(A))),{observations:[],sessions:[],prompts:[]}}}let O=`
      SELECT o.*
      FROM observations o
      LEFT JOIN sdk_sessions src ON src.memory_session_id = o.memory_session_id
      WHERE o.created_at_epoch >= ? AND o.created_at_epoch <= ? ${E.clause}
      ORDER BY o.created_at_epoch ASC, o.id ASC
    `,h=`
      SELECT ss.*
      FROM session_summaries ss
      LEFT JOIN sdk_sessions src ON src.memory_session_id = ss.memory_session_id
      WHERE ss.created_at_epoch >= ? AND ss.created_at_epoch <= ? ${d.clause}
      ORDER BY ss.created_at_epoch ASC, ss.id ASC
    `,f=`
      SELECT up.*, s.project, s.memory_session_id, COALESCE(NULLIF(s.platform_source, ''), '${T}') as platform_source
      FROM user_prompts up
      JOIN sdk_sessions s ON up.session_db_id = s.id
      WHERE up.created_at_epoch >= ? AND up.created_at_epoch <= ? ${c.clause}
      ORDER BY up.created_at_epoch ASC, up.id ASC
    `,I=this.db.prepare(O).all(l,m,...E.params),R=this.db.prepare(h).all(l,m,...d.params),p=this.db.prepare(f).all(l,m,...c.params);return{observations:I,sessions:R.map(S=>({id:S.id,memory_session_id:S.memory_session_id,project:S.project,request:S.request,completed:S.completed,next_steps:S.next_steps,created_at:S.created_at,created_at_epoch:S.created_at_epoch})),prompts:p.map(S=>({id:S.id,content_session_id:S.content_session_id,prompt_number:S.prompt_number,prompt_text:S.prompt_text,project:S.project,platform_source:S.platform_source,created_at:S.created_at,created_at_epoch:S.created_at_epoch}))}}getOrCreateManualSession(e,s=T){let t=N(s),n=`manual-${e}-${t}`,i=`manual-content-${e}-${t}`;if(this.db.prepare("SELECT memory_session_id FROM sdk_sessions WHERE memory_session_id = ?").get(n))return n;let a=new Date;return this.db.prepare(`
      INSERT INTO sdk_sessions (memory_session_id, content_session_id, project, platform_source, started_at, started_at_epoch, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `).run(n,i,e,t,a.toISOString(),a.getTime()),u.info("SESSION","Created manual session",{memorySessionId:n,project:e,platformSource:t}),n}close(){this.db.close()}importSdkSession(e){let s=N(e.platform_source),t=this.db.prepare(`SELECT id FROM sdk_sessions
       WHERE platform_source = ? AND content_session_id = ?`).get(s,e.content_session_id);if(t)return{imported:!1,id:t.id};let n=e.custom_title??null;if(n!==null&&typeof n!="string")throw new TypeError("Imported custom_title must be a string or null");let i=this.db.prepare(`
      INSERT INTO sdk_sessions (
        content_session_id, memory_session_id, project, platform_source, user_prompt, custom_title,
        started_at, started_at_epoch, completed_at, completed_at_epoch, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);return this.db.transaction(()=>({imported:!0,id:i.run(e.content_session_id,e.memory_session_id,e.project,s,e.user_prompt,n,e.started_at,e.started_at_epoch,e.completed_at,e.completed_at_epoch,e.status).lastInsertRowid}))()}importSessionSummary(e){if(typeof e?.memory_session_id!="string"||e.memory_session_id.trim()==="")return u.warn("DB","Skipping imported session summary without memory_session_id",{project:typeof e?.project=="string"?e.project:null}),{imported:!1,id:0};let s=this.db.prepare(`SELECT id FROM session_summaries WHERE memory_session_id = ?
        AND request IS ? AND investigated IS ? AND learned IS ? AND completed IS ?
        AND next_steps IS ? AND files_read IS ? AND files_edited IS ? AND notes IS ?
        AND prompt_number IS ? AND created_at_epoch = ?`).get(e.memory_session_id,b(e.request),b(e.investigated),b(e.learned),b(e.completed),b(e.next_steps),b(e.files_read),b(e.files_edited),b(e.notes),e.prompt_number??null,e.created_at_epoch);if(s)return{imported:!1,id:s.id};let n=this.db.prepare(`
      INSERT INTO session_summaries (
        memory_session_id, project, request, investigated, learned,
        completed, next_steps, files_read, files_edited, notes,
        prompt_number, discovery_tokens, created_at, created_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(e.memory_session_id,e.project,b(e.request),b(e.investigated),b(e.learned),b(e.completed),b(e.next_steps),b(e.files_read),b(e.files_edited),b(e.notes),e.prompt_number,e.discovery_tokens||0,e.created_at,e.created_at_epoch);return $({projects:[e.project]},"importSessionSummary"),{imported:!0,id:n.lastInsertRowid}}importObservation(e){if(typeof e?.memory_session_id!="string"||e.memory_session_id.trim()==="")return u.warn("DB","Skipping imported observation without memory_session_id",{title:typeof e?.title=="string"?e.title:null,type:typeof e?.type=="string"?e.type:null}),{imported:!1,id:0};let s=this.db.prepare(`
      SELECT id FROM observations
      WHERE memory_session_id = ? AND text IS ? AND type = ?
        AND title IS ? AND subtitle IS ? AND facts IS ? AND narrative IS ?
        AND concepts IS ? AND files_read IS ? AND files_modified IS ?
        AND prompt_number IS ? AND agent_type IS ?
        AND agent_id IS ? AND created_at_epoch = ?
    `).get(e.memory_session_id,b(e.text),e.type,b(e.title),b(e.subtitle),b(e.facts),b(e.narrative),b(e.concepts),b(e.files_read),b(e.files_modified),e.prompt_number??null,e.agent_type??null,e.agent_id??null,e.created_at_epoch);if(s)return{imported:!1,id:s.id};let n=this.db.prepare(`
      INSERT INTO observations (
        memory_session_id, project, text, type, title, subtitle,
        facts, narrative, concepts, files_read, files_modified,
        prompt_number, discovery_tokens, agent_type, agent_id,
        created_at, created_at_epoch
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(e.memory_session_id,e.project,b(e.text),e.type,b(e.title),b(e.subtitle),b(e.facts),b(e.narrative),b(e.concepts),b(e.files_read),b(e.files_modified),e.prompt_number,e.discovery_tokens||0,e.agent_type??null,e.agent_id??null,e.created_at,e.created_at_epoch);return $({projects:[e.project]},"importObservation"),{imported:!0,id:n.lastInsertRowid}}rebuildObservationsFTSIndex(){this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='observations_fts'").all().length>0&&this.db.run("INSERT INTO observations_fts(observations_fts) VALUES('rebuild')")}importUserPrompt(e){let s=null,t=e.platform_source?N(e.platform_source):void 0;if(typeof e.session_db_id=="number"){let a=this.db.prepare(`
        SELECT id, content_session_id, COALESCE(NULLIF(platform_source, ''), '${T}') as platform_source
        FROM sdk_sessions
        WHERE id = ?
        LIMIT 1
      `).get(e.session_db_id);a&&a.content_session_id===e.content_session_id&&(!t||N(a.platform_source)===t)&&(s=a.id)}s===null&&(s=this.resolvePromptSessionDbId(e.content_session_id,void 0,t));let n=this.db.prepare(`
      SELECT id FROM user_prompts
      WHERE ${s!==null?"session_db_id = ?":"content_session_id = ?"} AND prompt_number = ?
    `).get(s??e.content_session_id,e.prompt_number);return n?{imported:!1,id:n.id}:{imported:!0,id:this.db.prepare(`
      INSERT INTO user_prompts (
        session_db_id, content_session_id, prompt_number, prompt_text,
        created_at, created_at_epoch, native_prompt_id, native_prompt_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(s,e.content_session_id,e.prompt_number,b(e.prompt_text),e.created_at,e.created_at_epoch,e.native_prompt_id??null,e.native_prompt_hash??null).lastInsertRowid}}};0&&(module.exports={SessionStore,TELEGRAM_WRAPUP_CLAIM_STALE_AFTER_MS,rollupObservationFileLists});
//# sourceMappingURL=SessionStore.js.map
