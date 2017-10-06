import React, { Component } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getDeck } from "../api/deckApi";
import * as colors from "../utils/colors";
import { setQuizStatus } from "../api/quizStatusApi";

export default class QuizView extends Component {
    state = {
        questions: [],
        responses: [],
        fetchingQuestions: true,
        showQuestion: true
    };

    componentDidMount() {
        const {params} = this.props.navigation.state;
        const {deckTitle} = params;

        getDeck(deckTitle)
            .then(deck => {
                this.setState({
                    questions: deck.questions,
                    fetchingQuestions: false
                });
            })
    };

    componentWillUpdate(prevProps, nextState) {
        const { questions, responses } = nextState;

        if (questions.length > 0 && questions.length === responses.length) {
            setQuizStatus();
        }
    }

    handleCorrectResponse = () => {
        this.setState((state) => {
            return {
                responses: [...state.responses, true]
            }
        });
    };

    handleIncorrectResponse = () => {
        this.setState((state) => {
            return {
                responses: [...state.responses, false]
            }
        });
    };

    toggleQuestionAnswer = () => {
        this.setState((state) => {
            return {
                showQuestion: !state.showQuestion
            };
        });
    };

    restart = () => {
        this.setState({
            showQuestion: true,
            responses: []
        });
    };

    backToDeck = () => {
        this.props.navigation.goBack();
    };

    render() {
        const {questions, fetchingQuestions, responses, showQuestion} = this.state;

        if (fetchingQuestions) {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Fetching Questions....</Text>
                </View>
            );
        }

        if (questions.length === 0) {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>You haven't added any cards yet 🙁</Text>
                </View>
            );
        }

        // User done with Quiz
        if (responses.length === questions.length) {
            const correctPercentage =
                (responses.filter(x => x).length / responses.length * 100).toFixed(0);

            return (
                <View style={styles.quizContainer}>
                    <Text style={styles.congratsText}>
                        Congratulations! You have finished the quiz with a score of {`${correctPercentage}%`}
                    </Text>
                    <View>
                        <TouchableOpacity onPress={this.restart}
                                          style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.backToDeck}
                                          style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        const currentQuestion = questions[responses.length];

        return (
            <View style={styles.quizContainer}>
                <View>
                    <Text style={styles.progressText}>
                        {responses.length + 1} / {questions.length}
                    </Text>
                    {
                        showQuestion ?
                            <View style={styles.quizCard}>
                                <Text style={styles.quizText}>{currentQuestion.question}</Text>
                                <Button onPress={this.toggleQuestionAnswer}
                                        title='Answer'
                                        style={styles.toggleButton}/>
                            </View>
                            :
                            <View style={styles.quizCard}>
                                <Text style={styles.quizText}>{currentQuestion.answer}</Text>
                                <Button onPress={this.toggleQuestionAnswer}
                                        title='Question'
                                        style={styles.toggleButton}>
                                </Button>
                            </View>
                    }
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.handleCorrectResponse(currentQuestion)}
                                      style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleIncorrectResponse(currentQuestion)}
                                      style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        fontSize: 24
    },
    congratsText: {
        fontSize: 32,
        textAlign: 'center'
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    progressText: {
        fontSize: 24,
        marginBottom: 20,
        alignSelf: 'center'
    },
    quizCard: {
        flex: 0,
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.125)',
        borderWidth: 2
    },
    quizText: {
        fontSize: 36
    },
    toggleButton: {
        marginTop: 10
    },
    actionButton: {
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: colors.black,
    },
    actionButtonText: {
        fontSize: 22,
        color: colors.white,
        textAlign: 'center'
    }
});