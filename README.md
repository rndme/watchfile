watchfile.js
=========
Watches a file input for changes, AND watches the actual file(s) for disk-based changes. 


Why use it
------
* enable live css-tweaking while using a fancy desktop-based editor.
* instantly update a displayed camera image with a fresh capture when as soon as it saves
* send real-time data to webpages from any application or shell script that can output to a file
* monitor log files to play certain audio tags if the tail matches a regexp
* got any ideas? add them in here!


How it works
------
* Adds a change event to a specified input[type=file]
* On any populated files, watchfile.js adds a .url property to each file object, which can be fed to an a/link href, script/img/iframe src, ajax, etc.
* Once the file input is populated, the file(s) lastModified date is repeatedly checked for changes, a default of 3 times a second.
* When a populated file's date on the disk/path changes, file.url is updated with the new date and the callBack is fired again.
 
 
How to use it
-------
* add a file input to your html page
* add the watchfile.js code to you page, copy and paste or external script.
* call fileWatcher with an input to be watched and a function to fire upon changes
* when you or an application updates the file on disk, the callback re-fires.


Call Signature
-------
`watchFile(inpFile, callBack, optNumPollIntervalMS)`
* _inpFile_ - a input of type=file to monitor for selection and selected file changes
* _callBack_ - a function that will be passed a file object as the first and only argument when that file loads or changes
* _optNumPollIntervalMS_ - the polling interval in milliseconds, defaults to 333


Live Demo
-------
See demo page at <http://danml.com/watchfile.html> 


