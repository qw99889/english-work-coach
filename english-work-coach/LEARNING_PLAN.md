# EnglishWorkCoach Agent Learning Plan

## Why This Project Exists

The goal of this project is to learn how to build an Agent through a personal and interesting project.

The user wants to improve English speaking, reading, and listening, and eventually communicate fluently in English at work.

This project is also a learning path for understanding Agents:

- Prompt design
- Command routing
- Tool calling
- Local memory
- Multi-step workflows
- Review and planning
- Later: MCP and more advanced Agent architecture

## Stage 0: Current State

Status: Done

The project has been initialized as a TypeScript CLI app.

Current capabilities:

- Run with `pnpm dev`
- Read user input from command line
- Call DeepSeek API
- Return English coaching response
- Save practice records locally

DeepSeek is used through the OpenAI-compatible SDK.

## Stage 1: Basic English Coach CLI

Goal: Make the CLI useful for daily English practice.

Tasks:

1. Improve the system prompt.
2. Support free-form user input.
3. Save each practice record.
4. Make output format stable and easy to read.

Definition of done:

- User can enter a Chinese sentence and get natural English.
- User can enter an English sentence and get correction.
- Each interaction is saved locally.

## Stage 2: Command Router

Goal: Make the Agent respond differently based on user intent.

Commands:

- `/express`
- `/correct`
- `/help`

Expected behavior:

- `/express 中文内容`  
  Convert Chinese into natural English.

- `/correct English sentence`  
  Correct English and explain improvements.

- `/help`  
  Show available commands.

- Unknown command or free-form input  
  Fall back to the default English coach behavior.

Agent learning focus:

- Intent recognition
- Routing
- Prompt specialization
- Separating CLI input handling from Agent task handling

Definition of done:

- The CLI can parse the command.
- Different commands use different task prompts.
- `/help` returns local help text without calling the LLM.
- Unknown commands still work as general English coaching.

Recommended implementation order:

1. Implement `/help` first.
2. Add a small `parseCommand` function.
3. Route `/express` to an expression-specific prompt.
4. Route `/correct` to a correction-specific prompt.
5. Add fallback behavior for unknown commands.

## Stage 3: Structured Local Memory

Goal: Save useful practice data in a structured way.

Data model:

    type PracticeRecord = {
      date: string;
      command: string;
      input: string;
      output: string;
      usefulPhrases?: string[];
      mistakes?: string[];
    };

Possible storage:

    data/
      records/
        2026-05-02.md
      records.json

Agent learning focus:

- Tool design
- Local memory
- Structured output
- Making saved records useful for future review

Definition of done:

- Each practice record includes command type, input, output, and date.
- Records can be searched or reviewed later.
- The record format is stable enough for future `/review`.

## Stage 4: Review Command

Goal: Let the Agent summarize recent mistakes and reusable phrases.

Command:

- `/review`

Expected behavior:

1. Read recent practice records.
2. Summarize common mistakes.
3. List useful workplace phrases.
4. Generate 3 practice tasks.

Agent learning focus:

- Reading tool results
- Using local history
- Personalized feedback
- Avoiding made-up summaries

Definition of done:

- `/review` can summarize recent records.
- The summary is based on saved files, not made up.
- If there are no records, the Agent should clearly say so.

## Stage 5: Daily Practice Plan

Goal: Generate a short daily English training plan.

Command:

- `/plan`

Expected behavior:

Generate a 15-minute plan:

1. 5 minutes expression practice.
2. 5 minutes reading or listening practice.
3. 5 minutes speaking or role-play.

Agent learning focus:

- Planning
- Task decomposition
- Personalized practice
- Turning learning history into next actions

Definition of done:

- `/plan` generates a realistic 15-minute plan.
- Plan can reference recent mistakes if available.
- Plan should be short enough to actually follow.

## Stage 6: Workplace Role-play

Goal: Practice real work communication.

Commands:

- `/roleplay bug`
- `/roleplay meeting`
- `/roleplay code_review`
- `/roleplay standup`

Expected behavior:

The Agent should play a workplace conversation partner and correct the user after each turn.

Example:

    User:
    /roleplay standup

    Agent:
    Let's do a daily standup. What did you work on yesterday?

Agent learning focus:

- Multi-turn state
- Scenario simulation
- Feedback loop
- Separating correction from conversation flow

Definition of done:

- User can practice a short workplace conversation.
- Agent gives corrections and asks follow-up questions.
- The role-play should not become too long or overwhelming.

## Stage 7: Reading and Listening Practice

Goal: Improve reading and listening through text-based exercises first.

Commands:

- `/read`
- `/listen`

Expected behavior:

- `/read` helps analyze an English paragraph.
- `/listen` generates a short listening-style script and comprehension questions.

Agent learning focus:

- Content generation
- Comprehension tasks
- Progressive difficulty
- Building practice materials without external audio first

Definition of done:

- User can practice reading and listening without external audio.
- Reading practice should include main idea, key phrases, and retelling.
- Listening practice should include script, questions, and shadowing sentences.

## Stage 8: Later Extensions

Only after the CLI version is stable:

1. Add Web UI.
2. Add speech input.
3. Add TTS.
4. Add spaced repetition.
5. Add MCP server.
6. Add Android/Kotlin version.
7. Add database.

Do not start these too early.

## General Learning Principle

Each stage should teach one Agent concept.

Do not rush to make the project look complete.

The goal is to understand how an Agent grows from:

    Prompt
      -> Command Router
      -> Tools
      -> Memory
      -> Review
      -> Planning
      -> Multi-turn workflows