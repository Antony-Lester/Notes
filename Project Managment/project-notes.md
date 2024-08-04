Problem Statement - What problem are we trying to address?
When you’re stuck for options to dine by yourself or with someone else, it can be daunting to find any good ideas of places to eat.

Proposed Solution - What is our solution?
Based on the user’s location they will be able to swipe left or right depending on if they are interested in the displayed dining venue.

Core MVP Features - Think User Stories
The core features of Find ‘N Dine is to allow users to filter through dining venues that suit their preferences. After filtering through the categories of food, they’re presented with cards to swipe left/right

Future Scope - Additional Features In Future Iterations
Enable users-based reviews,  Table bookings, expand different venue types (Like bars, clubs, museums)

https://www.youtube.com/watch?v=0-S5a0eXPoc 45mins

==prep==
Two ways to build app..
    React Native CLI
    Expo CLI (Its Framework & Tools it sits on top of react native and hides complexity by removing iOs & android specific code)
==SetUp Enviro==

1. Check Node is Version 12 is higher    $ node -v

2. Install Expo (global)    $ npm i -g expo-cli

3. To Run Emulator on physical device Install App    ->    Expo Client

4. VS CODE Extension for Debugging     -> React Native Tools

5. VS CODE Extension for snippits / short cuts    -> React-Native/React/Redux snippets

6. VS CODE Extension for icons    -> Material Icon Theme

7. VS CODE Extension for formatting     -> Prettier
     To Enable Auto Formatting (optional)-> VSCODE > Menu > Preferences > Settings > Search 'formatonsave' then check tickbox
   ==Create App==

8. $ expo init <APP-NAME>
    Select -> ----- Managed workflow ----- blank (TypeScript)

9. Move in to Folder -> cd <APP-NAME>
   ==To Start App==
   npm start
   ==Emulator==
   =Mac= 

10. Install XCode from app store (is large size)

11. run it

12. In Xcode Menu > Preferences > Locations > Command Line Tools (set to latest Xcode version)

13. In Xcode Menu > Open Developer Tool > Simulator

14. (optional) can change emulator device In Simulator File > Open Device > iOs 

15. Go to Merto Bundler and Click run on iOs Simulator or i in running terminal window
    (there is a developer menu on the simulator to reload app Ect ? Control + D ?)
    a for Android 
    =Android=

16. Install Android Studio (standard install)

17. Configure menu (bottom right) > SDK Manager
     in SDK Tools check Android Emulator & Android SDK Platform-Tools is installed
    For Mac / Linux:
     a. In Browser GoTo docs.expo.io > Managed WorkFlow > Android Studio Emulator
    
         follow steps.. to edit bash profile (the path is in Android Studio > Configure > SDK Manager AS 'Android SDK Location')
         if using Zshell you need to add path also (from home directory) $ code .zshrc 
         (copy the two export statements over from bash)
    
     b. Run $ adb (to check is working)

18. Android Studio > Configure > ADV Manager > Create Virtual Device > Pick a phone of typical size > 
     Pick a system image (I Recomend Q or {R if stable}) -- Download (large)

19. play button on right in devices list to start emulator

20. In Metro Bundle click Run on Android device/emulator or a in running termal
    =Physical Device=

21. Download App 'Expo Client'

22. connect to same Wifi as pc

23. In Metro Bundle Scan Qr Code

24. shake device to bring up Dev menu
    ==Debugging==
    VS CODE debugging button on left
    (if no launch.json) 
     click on it and select react native
     unclick Debug Android and click Attach to packager
     in launch.json click Add in Configurations Array
     reactnative and click suggestion desired (Debug Android) > save file

in debugger side pannel select Attach to packager > click play button
in debug terminal
might have to hange port in vscode settings > (search react-native.packager.port) 
    change to port in browser path then close open tab

==Structure==
assets folder - Images/videos
App.js - is still Home/Root

==Components==
https://reactnative.dev/docs/components-and-apis

* you have to import UI Components from React Native
  import { View } from 'react-native' 
  -standard container
  <View style={{ backgroundColor: "blue", flex: 0.3 }} />
  -Text
  <Text numberOfLines={5}>{bodyText}</Text>
  -Image
  <Image style={styles.tinyLogo} source={require('@expo/snack-static/react-native-logo.png')}/>
  -Button
  <Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
  />
  -Alert

==Swipe==
import React, {Component} from 'react';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

onSwipeUp(gestureState) {
this.setState({myText: 'You swiped up!'});
}

onSwipeDown(gestureState) {
this.setState({myText: 'You swiped down!'});
}

onSwipeLeft(gestureState) {
this.setState({myText: 'You swiped left!'});
}

onSwipeRight(gestureState) {
this.setState({myText: 'You swiped right!'});
}

onSwipe(gestureName, gestureState) {
const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
this.setState({gestureName: gestureName});
switch (gestureName) {
case SWIPE_UP:
this.setState({backgroundColor: 'red'});
break;
case SWIPE_DOWN:
this.setState({backgroundColor: 'green'});
break;
case SWIPE_LEFT:
this.setState({backgroundColor: 'blue'});
break;
case SWIPE_RIGHT:
this.setState({backgroundColor: 'yellow'});
break;
}
}

//velocityThreshold - minimum swipe speed (vx/vy)
//directionalOffsetThreshold - swipe directrection tolerence (dx/dy)
//gestureIsClickThreshold - minimum distance to trigger (dx/dy)
const config = {
velocityThreshold: 0.3,
directionalOffsetThreshold: 80,
gestureIsClickThreshold: 5
};

return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        <Text>{this.state.myText}</Text>
      </GestureRecognizer>
    );

==Styling==
//styling properties are Java
<View style={styles.container}>

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    },
});

==CardFlip==
  npm install --save react-native-card-flip

import CardFlip from 'react-native-card-flip';

<CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
<TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>AB</Text></TouchableOpacity>
<TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
</CardFlip>

==CardHint== ?

<CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
  <TouchableOpacity style={styles.card} onPress={() => this.card.tip({ direction: 'right', duration: 150 })} ><Text>AB</Text></TouchableOpacity>
  <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
</CardFlip>

==Publish==
Can publish through Metro Bundler (compiler) & Expo for demo purposes -> npm start
or terminal
$ expo publish
make account

#945656    (148,86,86)
#5baea7    (91,174,167) //background
#9a9a9a    (154,154,154) //base
#a15f5f    (161,95,95)
#48767c    (72,118,124) //background highlight

This sprint should consolidate your understanding of making a C.R.U.D application from a front end perspective.

Kanban
Link to your Trello Board here: https://trello.com/b/cEYt2hYP
To keep track of the tasks involved in this project we're going to use a kanban board. Ensure that you work on one ticket at time. You can click on the ticket to find out more information about what is required for the feature. A ticket is not considered complete unless both the happy path and errors response are handled and there is a basic structure to your styling.

We suggest you work through the tickets from top to bottom.

Git Branching and Pull Requests
You will be working on each ticket on a new branch.

To create and switch to a new git branch use the command:

git checkout -b <new branch name>
This will create a branch and move over to that branch. (Omit the -b flag if you wish to switch to an already existing branch).

We recommend that you name the branch something that clearley shows the ticket you are working on. eg. fe-ncnews-display-articles

When pushing the branch to git hub ensure that you make reference to the branch you are pushing to on the remote.

git push origin <branch name>
From github you can make a pull request and share the link and ticket number on your nchelp with a zoom link for you to demo your feature. A tutor will swing by to review your code. Ensure that you keep your trello up to date whilst you await the PR approval.

Once a pull request been accepted be sure to switch back to the main branch and pull down the updated changes.

git checkout main

git pull origin main
You can tidy up your local branches once they have been pull into main by deleting them:

git branch -D <local branch>
Important
This sprint is among the ones we'll ask you to complete in order to put you forward for jobs. Put a little bit of love into it! :) <3
