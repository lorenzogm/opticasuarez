# Script Opportunities Analysis: custom-qa

**Scan Date:** 2026-03-30 | **Scanner:** L6 Script Opportunities | **Status:** 6 Opportunities Found

---

## Executive Summary

The `custom-qa` workflow has **significant script opportunities**, particularly in pre-processing and state management. An estimated **1800-2600+ tokens per epic run** could be saved by extracting deterministic operations into scripts.

**Current state:** No scripts exist (`/scripts/` directory absent).

---

## High Priority

### 1. Acceptance Criteria Extraction (HIGHEST PRIORITY)

**LLM Tax:** 400-600 tokens per epic
**Location:** Step 1 (Test Planning)
**Current:** LLM reads 5-10 story files, searches for acceptance criteria sections, parses each criterion
**Script:** Python script that globs story files, extracts structured criteria (Given/When/Then), outputs compact JSON
**Benefits:** LLM receives 500-800 token JSON vs. 2000-3000 token raw files; consistent input shape
**Reuse:** custom-dev, architecture review, sprint planning

### 2. Test Case Counting & Coverage Metrics (HIGH)

**LLM Tax:** 250-380 tokens
**Location:** Step 6 (Coverage Summary)
**Current:** LLM reads test files, counts cases per story, aggregates
**Script:** Python regex to extract `describe`/`it` blocks from Vitest, `test` calls from Playwright; output JSON inventory
**Reuse:** CI dashboards, sprint reporting

---

## Medium Priority

### 3. Architecture & Component Inventory

**LLM Tax:** 300-450 tokens per epic
**Location:** Step 1 (Test Planning)
**Current:** LLM reads architecture.md and scans app directory
**Script:** Python to parse architecture doc sections, scan for React components/hooks/services, output structured JSON
**Reuse:** custom-dev, documentation agents

### 4. Test Pattern Inventory

**LLM Tax:** 250-350 tokens per epic
**Location:** Step 1 (Test Planning)
**Current:** LLM scans existing test files to understand patterns
**Script:** Python to sample existing tests, extract import patterns, assertion styles, mocking strategies; output JSON template library
**Reuse:** Any test generation workflow

### 5. Configuration Resolution

**LLM Tax:** 140-200 tokens
**Location:** On Activation
**Current:** LLM loads and parses config YAML
**Script:** Python (`pyyaml`) to parse config and output resolved JSON
**Reuse:** All BMM workflow agents

### 6. State Detection & YAML Parsing

**LLM Tax:** 160-240 tokens
**Location:** On Activation
**Current:** LLM reads qa-status.yaml, parses progress
**Script:** Python to parse status YAML, output machine-readable state
**Reuse:** Sprint status tracking

---

## Intelligence Placement Assessment

| Operation | Belongs In |
|-----------|-----------|
| Parse config YAML | Script |
| Parse qa-status.yaml | Script |
| Discover epic/story files | Script |
| Extract acceptance criteria text | Script |
| Count test cases in files | Script |
| **Map criteria to test layers** | **Prompt** (judgment) |
| **Decide mock strategy** | **Prompt** (judgment) |
| **Generate test code** | **Prompt** (creativity) |
| **Assess coverage gaps** | **Prompt** (judgment) |

Core LLM work — semantic analysis of criteria, test layer assignment, test code generation — stays in prompts. Data preparation and validation can be scripted.
