//Copyright (C) 2011 by Allain Lalonde (allain.lalonde@gmail.com)
//
//See the file LICENSE.txt for copying permission.

window.ConceptMap = function() {
  var _this = this;
  
  this.listeners = new ListenerPool(this);
  this.concepts = [];
  this.relations = [];
  
  var conceptMap = [];

  function getConcept(title) {
    return conceptMap[title] ? conceptMap[title] : null;
  }

  this.addConcept = function(concept) {
    if (typeof(concept) == "string") {
      concept = new Concept(concept);
    }

    if (!conceptMap[concept.title]) {
      this.concepts.push(concept);
      conceptMap[concept.title] = concept;

      this.listeners.broadcastEvent("conceptAdded", [concept]);
    }

    return conceptMap[concept.title];
  }

  this.removeConcept = function (concept) {
    delete conceptMap[concept.title];
    var newConcepts = [];
    for (var i=0; i < this.concepts.length; i++) {
      if ( this.concepts[i] != concept) {
        newConcepts.push( this.concepts[i]);
      }
    }
    this.concepts = newConcepts;
    this.listeners.broadcastEvent("conceptRemoved", [concept]);
  }

  this.addRelation = function(relation) {
    if (relation instanceof Concept) {
      relation = new Relation(arguments[0], arguments[1], arguments[2]);
    }

    var existingRelation = getRelation(relation.from, relation.to, relation.label);
    if (existingRelation) {
      relation = existingRelation;
    } else {
      this.relations.push(relation);

      this.listeners.broadcastEvent("relationAdded", [relation]);
    }
    return relation;
  }

  function getRelation(from, to, label) {
    for (var i = 0; i < _this.relations.length; i++) {
      var r = _this.relations[i];    
      if (r.label == label && r.from == from && r.to == to) {
        return r;
      }
    }
    return null;
  }

  this.removeRelation = function (relation) {    
    var newRelations = [];
    for (var i=0; i < this.relations.length; i++) {
      if (this.relations[i] != relation) {
        newRelations.push(this.relations[i]);
      }
    }
    this.relations = newRelations;

    this.listeners.broadcastEvent("relationRemoved", [relation]);
  }

  function parseFact(fact) {
    if (/^[^"]+"[^"]+"[^"]+$/.test(fact)) {
      var firstQuote = fact.indexOf('"');
      var secondQuote = fact.indexOf('"', firstQuote + 1);

      var topic1 = fact.substr(0, firstQuote).trim();
      var relation = fact.substr(firstQuote + 1, secondQuote - firstQuote - 1).trim();
      var topic2 = fact.substr(secondQuote + 1).trim();

      return {concept1: topic1, relation: relation, concept2: topic2};
    } else if (/^([A-Z][a-z]* )+([a-z]+ )+[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(fact)) {
      var words = fact.split(/( [a-z]+)+/g);

      var firstLowerCaseWord = fact.indexOf(/ [a-z]/);

      var firstUpperAfterRelation = fact.indexOf(/ [A-z]/, firstLowerCaseWord + 1);
      var topic1 = words[0].trim();
      var topic2 = words[words.length-1].trim();
      var relation = fact.substr(topic1.length, fact.length-topic1.length-topic2.length).trim();

      return {concept1: topic1, relation: relation, concept2: topic2};
    }

    return null;
  }

  this.getFact = function (fact) {
    var factParts = parseFact(fact);
    if (factParts) {
      var concept1 = getConcept(factParts.concept1);
      if (concept1 == null)
        return null;

      var concept2 = getConcept(factParts.concept2);
      if (concept2 == null)
        return null;

      return getRelation(concept1, concept2, factParts.relation);
    }

    return null;
  }

  this.addFact = function (fact) {
    var factParts = parseFact(fact);
    if (factParts) {
      var concept1 = this.addConcept(factParts.concept1);
      var concept2 = this.addConcept(factParts.concept2);
      return this.addRelation(concept1, concept2, factParts.relation);
    }

    return null;
  } 

  this.loadFacts = function (text) {
    var facts = text.split("\n");
    var touchedConcepts = [];
    var touchedRelations = [];

    var changeHistory = [];

    for (var i=0; i < facts.length; i++) {
      var fact = facts[i].trim();
      if (fact.length > 0) {
        var relation = this.addFact(fact);
        if (relation) {
          touchedRelations[relation] = true;
          touchedConcepts[relation.from] = true;
          touchedConcepts[relation.to] = true;
        }
      }
    }

    var oldConcepts = this.concepts.slice(0);
    var oldRelations = this.relations.slice(0);

    for (var i = 0; i < oldRelations.length; i++) {
      if (!touchedRelations[oldRelations[i]]) {     
        this.removeRelation(oldRelations[i]);
      }
    }

    for (var i = 0; i < oldConcepts.length; i++) {
      if (!touchedConcepts[oldConcepts[i]]) {
        this.removeConcept(oldConcepts[i]);
      }
    }
  }
}

ConceptMap.ARROW_SIZE = 10;
ConceptMap.ARROW_ANGLE = Math.PI / 6;