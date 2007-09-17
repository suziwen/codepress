/**
 * CodePress regular expressions for AutoIt syntax highlighting
 * @author: James Brooks, Michael HURNI
 */ 
 
// AutoIt 
Language.syntax = [  
//  { input : /({|}|\(|\))/g, output : '<operator>$1</operator>' }, // Brackets
	{ input : /(\*|\+|-|\/)/g, output : '<operator>$1</operator>' }, // Operator
	{ input : /\"(.*?)(\"|<br>|<\/P>)/g, output : "<string>\"$1$2</string>" }, // strings double 
	{ input : /\'(.*?)(\'|<br>|<\/P>)/g, output : '<string>\'$1$2</string>' }, // strings single  
	{ input : /\b([\d]+)\b/g, output : '<number>$1</number>' }, // Numbers 
	{ input : /#(.*?)(<br>|<\/P>)/g, output : '<include>#$1</include>$2' }, // Directives and Includes 
	{ input : /(\$[\w\.]*)/g, output : '<var>$1</var>' }, // vars
	{ input : /(<br>|<\/P>| )(_[\w\.]*)/g, output : '<underscored>$1$2</underscored>' }, // underscored word
	{ input : /(\@[\w\.]*)/g, output : '<macro>$1</macro>' }, // Macros
	{ input : /\b(Abs|ACos|AdlibDisable|AdlibEnable|Asc|AscW|ASin|Assign|ATan|AutoItSetOption|AutoItWinGetTitle|AutoItWinSetTitle|Beep|Binary|BinaryLen|BinaryMid|BinaryToString|BitAND|BitNOT|BitOR|BitSHIFT|BitXOR|BlockInput|Break|Call|CDTray|Ceiling|Chr|ChrW|ClipGet|ClipPut|ConsoleRead|ConsoleWrite|ConsoleWriteError|ControlClick|ControlCommand|ControlDisable|ControlEnable|ControlFocus|ControlGetFocus|ControlGetHandle|ControlGetPos|ControlGetText|ControlHide|ControlListView|ControlMove|ControlSend|ControlSetText|ControlShow|Cos|Dec|DirCopy|DirCreate|DirGetSize|DirMove|DirRemove|DllCall|DllCall|DllClose|DllOpen|DllStructCreate|DllStructGetData|DllStructGetPtr|DllStructGetSize|DllStructSetData|DriveGetDrive|DriveGetFileSystem|DriveGetLabel|DriveGetSerial|DriveGetType|DriveMapAdd|DriveMapDel|DriveMapGet|DriveSetLabel|DriveSpaceFree|DriveSpaceTotal|DriveStatus|EnvGet|EnvSet|EnvUpdate|Eval|Execute|Exp|FileChangeDir|FileClose|FileCopy|FileCreateNTFS|FileCreateShortcut|FileDelete|FileExists|FileFindFirstFile|FileFindNextFile|FileGetAttrib|FileGetLongName|FileGetShortcut|FileGetShortName|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileOpen|FileOpenDialog|FileRead|FileReadLine|FileRecycle|FileRecycleEmpty|FileSaveDialog|FileSelectFolder|FileSetAttrib|FileSetTime|FileWrite|FileWriteLine|Floor|FtpSetProxy|GuiCreate|GuiCtrlCreateAvi|GuiCtrlCreateButton|GuiCtrlCreateCheckbox|GuiCtrlCreateCombo|GuiCtrlCreateContextMenu|GuiCtrlCreateDate|GuiCtrlCreateDummy|GuiCtrlCreateEdit|GuiCtrlCreateGraphic|GuiCtrlCreateGroup|GuiCtrlCreateIcon|GuiCtrlCreateInput|GuiCtrlCreateLabel|GuiCtrlCreateList|GuiCtrlCreateListView|GuiCtrlCreateListViewItem|GuiCtrlCreateMenu|GuiCtrlCreateMenuItem|GuiCtrlCreateMonthCal|GuiCtrlCreateObj|GuiCtrlCreatePic|GuiCtrlCreateProgress|GuiCtrlCreateRadio|GuiCtrlCreateSlider|GuiCtrlCreateTab|GuiCtrlCreateTabItem|GuiCtrlCreateUpdown|GuiCtrlDelete|GuiCtrlGetHandle|GuiCtrlGetState|GuiCtrlRead|GuiCtrlRecvMsg|GuiCtrlSentMsg|GuiCtrlSendToDummy|GuiCtrlSetBkColor|GuiCtrlSetColor|GuiCtrlSetCursor|GuiCtrlSetData|GuiCtrlSetFont|GuiCtrlSetGraphic|GuiCtrlSetImage|GuiCtrlSetLimit|GuiCtrlSetOnEvent|GuiCtrlSetPos|GuiCtrlResizing|GuiCtrlSetState|GuiCtrlSetTip|GuiDelete|GuiGetCursorInfo|GuiGetMsg|GuiGetStyle|GuiRegisterMsg|GuiSetBkColor|GuiSetCoord|GuiSetCursor|GuiSetFont|GuiSetHelp|GuiSetIcon|GuiSetOnEvent|GuiSetStat|GuiSetStyle|GuiStartGroup|GuiSwitch|Hex|HotKeySet|HttpSetProxy|HWnd|InetGet|InetGetSize|IniDelete|IniRead|IniReadSection|IniReadSectionNames|IniRenameSection|IniWrite|IniWriteSection|InputBox|Int|IsAdmin|IsArray|IsBinary|IsBool|IsDeclared|IsDllStruct|IsFloat|IsHWnd|IsInt|IsKeyword|IsNumber|IsObj|IsString|Log|MemGetStats|Mod|MouseClick|MouseClickDrag|MouseDown|MouseGetCursor|MouseGetPos|MouseMove|MouseUp|MouseWheel|MsgBox|Number|ObjCreate|ObjEvent|ObjGet|ObjName|Ping|PixelCheckSum|PixelGetColor|PixelSearch|ProcessClose|ProcessExists|ProcessList|ProcessSetPriority|ProcessWait|ProcessWaitClose|ProgressOff|ProcessOn|ProgressSet|Random|RegDelete|RegEnumKey|RegEnumVal|RegRead|RegWrite|Round|Run|RunAsSet|RunWait|Send|SetError|SetExtended|ShellExecute|ShellExecuteWait|Shutdown|Sin|Sleep|SoundPlay|SoundSetWaveVolume|SplashImageOn|SplashOff|SplashTextOn|Sqrt|SRandom|StatusbarGetText|StderrRead|StdinWrite|StdoutRead|String|StringAddCR|StringCompare|StringFormat|StringInStr|StringIsAlNum|StringIsAlpha|StringIsASCII|StringIsDigit|StringIsFloat|StringIsInt|StringIsLower|StringIsSpace|StringIsUpper|StringIsXDigit|StringLeft|StringLen|StringLower|StringMid|StringRegExp|StringRegExpReplace|StringReplace|StringRight|StringSplit|StringStripCR|StringStripWS|StringToBinary|StringTrimLeft|StringTrimRight|StringUpper|Tan|TCPAccept|TCPCloseSocket|TCPConnect|TCPListen|TCPNameToIP|TCPrecv|TCPSend|TCPShutdown|TCPStartup|TimerDiff|TimerInit|ToolTip|TrayCreateItem|TrayCreateMenu|TrayGetMenu|TrayGetMsg|TrayItemDelete|TrayItemGetHandle|TrayItemGetState|TrayItemGetText|TrayItemSetOnEvent|TrayItemSetState|TrayItemSetText|TraySetClick|TraySetIcon|TraySetOnEvent|TraySetPauseIcon|TraySetState|TraySetToolTip|TrayTip|UBound|UDPBind|UDPCloseSocket|UDPOpen|UDPRecv|UDPSend|WinActivate|WinActive|WinClose|WinExists|WinFlash|WinGetCaretPos|WinGetClassList|WinGetClientSize|WinGetHandle|WinGetPos|WinGetProcess|WinGetState|WinGetText|WinGetTitle|WinKill|WinList|WinMenuSelectItem|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinSetOnTop|WinSetState|WinSetTitle|WinSetTrans|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive)\b/g, output : '<reserved>$1</reserved>' } ,// reserved words
	{ input : /;(.*?)(<br>|<\/P>)/g, output : '<comment>;$1</comment>$2' }, // comments 
	{ input : /#CS(.*?)#CE/g, output : '<comment>#CS$1#CE</comment>' } // Block Comments
] 
 
Language.snippets = [] 
 
Language.complete = [ 
{ input : '\'',output : '\'$0\'' }, 
{ input : '"', output : '"$0"' }, 
{ input : '(', output : '\($0\)' }, 
{ input : '[', output : '\[$0\]' }, 
{ input : '{', output : '{\n\t$0\n}' } 
] 
 
Language.shortcuts = [] 
