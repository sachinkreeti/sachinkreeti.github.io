// replace these values with those generated in your TokBox Account


// (optional) add server code here
// initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var apiKey = document.getElementById('apiKey-id').value;
  var sessionId = document.getElementById('session-id').value;
  var token = document.getElementById('token-id').value;

  var session = OT.initSession(apiKey, sessionId);

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Subscribe to a newly created stream
  session.on('streamCreated', function (event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });

  let prevStats = {};
  window.setInterval(() => {
    publisher.getStats((error, statsArray) => {

      if (error) {
        return console.log(error);
      }

      console.log('statsArray', statsArray);

      // statsArray.forEach(statsObj => {
      //   if (statsObj.connectionId) {
      //     let prevStatsObj = prevStats[connectionId];
      //     console.log('stats for connection', statsObj.connectionId);
      //   } else {
      //     prevStatsObj = prevStats;
      //   }

      //   const stats = statsObj.stats;

      //   if (prevStatsObj.video) {
      //     var videoBitRate = 8 * (stats.video.bytesSent - prevStatsObj.video.bytesSent);
      //     console.log('video bit rate: ', videoBitRate, 'bps');
      //     var audioBitRate = 8 * (stats.audio.bytesSent - prevStatsObj.audio.bytesSent);
      //     console.log('audio bit rate: ', audioBitRate, 'bps');
      //   }

      //   if (stats.connectionId) {
      //     prevStats[connectionId] = stats;
      //   } else {
      //     prevStats = stats;
      //   }
      // });
    })
  }, 2000);
}
