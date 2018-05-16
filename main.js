function getOpportunities() {
  var opportunities = JSON.parse(localStorage.getItem('opportunities'));
  var opportunitiesList = document.getElementById('opportunitiesList');

  opportunitiesList.innerHTML = '';

  if (opportunities != null) {
    for (var i = 0; i < opportunities.length; i++) {
      var id = opportunities[i].id;
      var desc = opportunities[i].description;
      var likelihood = opportunities[i].likelihood;
      var owner = opportunities[i].owner;
      var status = opportunities[i].status;

      opportunitiesList.innerHTML +=
        '<div class="well">' +
        '<h6>Issue ID: ' +
        id +
        '</h6>' +
        '<p><span class="label label-info">' +
        status +
        '</span></p>' +
        '<div>' +
        desc +
        '</div>' +
        '<p><span class="glyphicon glyphicon-time"></span> ' +
        likelihood +
        ' ' +
        '<span class="glyphicon glyphicon-user"></span> ' +
        owner +
        '</p>' +
        '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' +
        id +
        '\')">Close</a> ' +
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' +
        id +
        '\')">Remove</a>' +
        '</div>';
    }
  }
}

document
  .getElementById('opportunityInputForm')
  .addEventListener('submit', saveIssue);

function saveIssue(e) {
  var opportunityId = Math.floor(Math.random() * 90000) + 10000;
  var opportunityDesc = document.getElementById('opportunityDescInput').value;
  var opportunityLikelihood = document.getElementById(
    'opportunityLikelihoodInput'
  ).value;
  var opportunityOwner = document.getElementById('opportunityOwnerInput').value;
  var opportunityStatus = 'Open';

  var opportunity = {
    id: opportunityId,
    description: opportunityDesc,
    likelihood: opportunityLikelihood,
    owner: opportunityOwner,
    status: opportunityStatus
  };

  if (localStorage.getItem('opportunities') === null) {
    var opportunities = [];
    opportunities.push(opportunity);
    localStorage.setItem('opportunities', JSON.stringify(opportunities));
  } else {
    var opportunities = JSON.parse(localStorage.getItem('opportunities'));
    opportunities.push(opportunity);
    localStorage.setItem('opportunities', JSON.stringify(opportunities));
  }

  document.getElementById('opportunityInputForm').reset();

  fetchOpportunities();

  e.preventDefault();
}

function setStatusClosed(id) {
  var opportunities = JSON.parse(localStorage.getItem('opportunities'));

  for (var i = 0; i < opportunities.length; i++) {
    if (opportunities[i].id == id) {
      opportunities[i].status = 'Closed';
    }
  }

  localStorage.setItem('opportunities', JSON.stringify(opportunities));

  fetchOpportunities();
}

function deleteIssue(id) {
  var opportunities = JSON.parse(localStorage.getItem('opportunities'));

  for (var i = 0; i < opportunities.length; i++) {
    if (opportunities[i].id == id) {
      opportunities.splice(i, 1);
    }
  }

  localStorage.setItem('opportunities', JSON.stringify(opportunities));

  fetchOpportunities();
}
