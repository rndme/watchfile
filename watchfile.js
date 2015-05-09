/* watchfile.js by dandavis. [CCBY2]@dandavis
 Watches a file input for changes, AND watches the actual file(s) for disk-based changes. 
 Adds a .url property to each file object, which can be fed to a script, img, video, ajax, etc.
 When a populated file's data on the disk/path changes, file.url is updated and the callBack is fired.
*/



function watchFile(inpFile, callBack, optNumPollIntervalMS, optNoURL ){
	
	var fileList=[], timer;
		
	function clearList(){ // revokes un-needed URLs, clear list of watched files
		if(optNoURL){
			fileList.forEach(function(file){
				URL.revokeObjectURL(file.url);
			});
		}
		fileList.length=0;		
	}
	
	function handleChanges(){ // logical event for disk-based file changes
		fileList.filter(function filt(file){return file.mod!=file.lastModifiedDate;}) //skip non-changed files
		 .forEach(function proc(file){
			if(!optNoURL){
				URL.revokeObjectURL(file.url); 		// cleanup
				file.url=URL.createObjectURL(file); 	// update
			}
			file.mod=file.lastModifiedDate; 	// remember version timestamp
			callBack(file);				// invoke callBack again with updated files
		 });
	}
	
	
	function onInputChange(){ 	// dom-based input change() handler
		clearList(); 		// selected files changed, revoke old urls
		clearInterval(timer);	// cancel old monitor (if any)
		fileList=[].slice.call(this.files); // memorize popoulated files so they can be revoked if input changes
		handleChanges();	// fire the file change callback now to "init" its functionality
		timer= setInterval( handleChanges, +optNumPollIntervalMS || 333 ); // watch for any changes on the selected file(s)
	}
	
	
	inpFile.addEventListener("change", onInputChange, true);
	inpFile.cancelWatch=function(){
		inpFile.removeEventListener("change", onInputChange, true);
	};
	
	if(inpFile.files.length){
		onInputChange.call(inpFile); // go ahead and raise watchfile's input change event if input is already populated, or if firefox rembebered them from last time
	}
	
  return true;
}
