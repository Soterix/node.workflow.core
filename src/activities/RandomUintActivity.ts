import { CancellationToken } from "@zxteam/contract";

import * as crypto from "crypto";

import { Activity } from "./Activity";
import { BusinessActivity } from "./BusinessActivity";

import { WorkflowVirtualMachine } from "../WorkflowVirtualMachine";

@Activity.Id("537f0a1c-4227-47bc-8ecc-b1da87a70e62")
export class RandomUintActivity extends BusinessActivity {
	public constructor(opts: RandomUintActivity.Opts) { super(opts); }

	protected async onExecute(cancellationToken: CancellationToken, ctx: WorkflowVirtualMachine.ExecutionContext): Promise<void> {
		const opts = this.opts as RandomUintActivity.Opts;

		const u8 = crypto.randomBytes(4);
		const u32bytes = u8.buffer.slice(0, 4); // last four bytes as a new `ArrayBuffer`
		const uint = new Uint32Array(u32bytes)[0];

		ctx.variables.set(opts.targetVariable, uint);
	}
}

export namespace RandomUintActivity {
	export interface Opts {
		readonly targetVariable: string;
	}
}
